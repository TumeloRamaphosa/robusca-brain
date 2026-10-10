/**
 * Portable sandbox interface.
 *
 * Everything in the control plane talks to this, never to a vendor SDK
 * directly. Sandbox providers are a fast-moving competitive category; keeping
 * the surface this small means swapping provider is one file, not a rewrite.
 *
 * Deliberately narrow: create, exec, snapshot, destroy, plus per-tenant
 * volumes and secrets. If a provider feature does not fit here, it probably
 * belongs in the control plane instead.
 */

export interface SandboxSpec {
  tenantSlug: string;
  /** Pre-baked image so the sandbox boots ready. */
  snapshotId?: string;
  /** Persistent per-tenant volume, mounted at /workspace. */
  volumeId?: string;
  vcpu?: number;
  memoryGiB?: number;
  /** Names of secrets to make available. Values never enter the sandbox. */
  secretRefs?: string[];
  /** Outbound allow-list. Empty means deny-all except the control plane. */
  networkAllow?: string[];
  /** Auto-pause after idle. Keep low — a stuck sandbox is a silent invoice. */
  idleTimeoutSeconds?: number;
  region?: string;
}

export interface SandboxHandle {
  id: string;
  provider: string;
  createdAt: Date;
}

export interface ExecResult {
  exitCode: number;
  stdout: string;
  stderr: string;
  durationMs: number;
}

export interface SandboxProvider {
  readonly name: string;

  create(spec: SandboxSpec): Promise<SandboxHandle>;
  exec(
    handle: SandboxHandle,
    command: string,
    opts?: { cwd?: string; timeoutSeconds?: number },
  ): Promise<ExecResult>;
  destroy(handle: SandboxHandle): Promise<void>;

  createVolume(tenantSlug: string, sizeGiB: number): Promise<string>;
  deleteVolume(volumeId: string): Promise<void>;

  /** Build a reusable image for a tenant. Boot cost paid once, not per run. */
  createSnapshot(tenantSlug: string, dockerfile: string): Promise<string>;

  /** Store a credential outside the sandbox, referenced by name at runtime. */
  putSecret(tenantSlug: string, name: string, value: string): Promise<void>;
  deleteSecret(tenantSlug: string, name: string): Promise<void>;
}

/**
 * Daytona implementation.
 *
 * NOTE: verify exact SDK signatures against docs.daytona.io before first run.
 * The shapes below follow the published Python/TS examples but the volume,
 * snapshot and secret calls have not been exercised against a live account.
 */
export class DaytonaProvider implements SandboxProvider {
  readonly name = "daytona";

  constructor(
    private readonly apiKey: string,
    private readonly defaultRegion = "eu-central",
  ) {
    if (!apiKey) throw new Error("DAYTONA_API_KEY is required");
  }

  async create(spec: SandboxSpec): Promise<SandboxHandle> {
    const body = {
      snapshot: spec.snapshotId,
      volumes: spec.volumeId ? [{ volumeId: spec.volumeId, mountPath: "/workspace" }] : [],
      resources: {
        cpu: spec.vcpu ?? 2,
        memory: spec.memoryGiB ?? 4,
      },
      // Daytona substitutes these at network egress; plaintext never lands
      // inside the sandbox filesystem.
      secrets: spec.secretRefs ?? [],
      networkAllowList: spec.networkAllow ?? [],
      autoStopInterval: Math.ceil((spec.idleTimeoutSeconds ?? 900) / 60),
      target: spec.region ?? this.defaultRegion,
      labels: { tenant: spec.tenantSlug, managedBy: "studex-os" },
    };

    const res = await this.request("POST", "/api/sandbox", body);
    return { id: res.id as string, provider: this.name, createdAt: new Date() };
  }

  async exec(
    handle: SandboxHandle,
    command: string,
    opts: { cwd?: string; timeoutSeconds?: number } = {},
  ): Promise<ExecResult> {
    const started = Date.now();
    const res = await this.request("POST", `/api/sandbox/${handle.id}/toolbox/process/execute`, {
      command,
      cwd: opts.cwd ?? "/workspace",
      timeout: opts.timeoutSeconds ?? 300,
    });

    return {
      exitCode: (res.exitCode as number) ?? 0,
      stdout: (res.result as string) ?? "",
      stderr: (res.stderr as string) ?? "",
      durationMs: Date.now() - started,
    };
  }

  async destroy(handle: SandboxHandle): Promise<void> {
    await this.request("DELETE", `/api/sandbox/${handle.id}`);
  }

  async createVolume(tenantSlug: string, sizeGiB: number): Promise<string> {
    const res = await this.request("POST", "/api/volumes", {
      name: `studex-${tenantSlug}`,
      size: sizeGiB,
    });
    return res.id as string;
  }

  async deleteVolume(volumeId: string): Promise<void> {
    await this.request("DELETE", `/api/volumes/${volumeId}`);
  }

  async createSnapshot(tenantSlug: string, dockerfile: string): Promise<string> {
    const res = await this.request("POST", "/api/snapshots", {
      name: `studex-${tenantSlug}-agent`,
      buildInfo: { dockerfileContent: dockerfile },
    });
    return res.id as string;
  }

  async putSecret(tenantSlug: string, name: string, value: string): Promise<void> {
    await this.request("POST", "/api/secrets", {
      name: `${tenantSlug}__${name}`,
      value,
    });
  }

  async deleteSecret(tenantSlug: string, name: string): Promise<void> {
    await this.request("DELETE", `/api/secrets/${tenantSlug}__${name}`);
  }

  private async request(
    method: string,
    path: string,
    body?: unknown,
  ): Promise<Record<string, unknown>> {
    const res = await fetch(`https://app.daytona.io${path}`, {
      method,
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: body === undefined ? undefined : JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new SandboxError(
        `daytona ${method} ${path} failed: ${res.status} ${text.slice(0, 300)}`,
        res.status,
      );
    }

    if (res.status === 204) return {};
    return (await res.json()) as Record<string, unknown>;
  }
}

export class SandboxError extends Error {
  constructor(
    message: string,
    readonly status?: number,
  ) {
    super(message);
    this.name = "SandboxError";
  }
}

/**
 * Runs work in a fresh sandbox and always tears it down.
 *
 * Ephemeral-per-task is the whole cost argument: a persistent 2 vCPU / 4 GiB
 * sandbox is ~R1,955/tenant/month, the same work run in bursts is ~R184.
 * If a caller ever needs a long-lived sandbox, make it explicit and alarmed.
 */
export async function withSandbox<T>(
  provider: SandboxProvider,
  spec: SandboxSpec,
  fn: (handle: SandboxHandle) => Promise<T>,
): Promise<T> {
  const handle = await provider.create(spec);
  try {
    return await fn(handle);
  } finally {
    await provider.destroy(handle).catch((err) => {
      // Never let teardown failure mask the original error, but never let it
      // pass silently either — an orphaned sandbox bills until someone notices.
      console.error(
        `[sandbox] orphaned ${handle.id} for ${spec.tenantSlug}: ${String(err)}`,
      );
    });
  }
}
