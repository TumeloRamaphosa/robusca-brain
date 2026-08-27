/**
 * OpenClaw Gateway adapter — one Gateway per tenant.
 *
 * Why per tenant rather than one shared Gateway: automation mutations require
 * operator.admin. On a shared Gateway there is no way to let a client manage
 * their own routines without granting admin over every client's routines. A
 * Gateway per tenant scopes that admin to exactly one customer.
 *
 * The Gateway also has to be running for schedules to fire, which is why these
 * live on Fly rather than anyone's desktop.
 */

export interface AutomationSpec {
  /** Stable id so sync is idempotent. */
  externalId: string;
  schedule:
    | { kind: "cron"; expr: string; tz: string }
    | { kind: "every"; expr: string }
    | { kind: "at"; at: string; tz?: string };
  /** "isolated" | "main" | "current" | "session:<name>" */
  session: string;
  prompt: string;
  delivery: {
    channel: string;
    mode: "announce" | "silent";
  };
}

export interface Automation extends AutomationSpec {
  id: string;
  enabled: boolean;
  lastRunAt?: string;
  nextRunAt?: string;
}

export interface GatewayHealth {
  reachable: boolean;
  automationCount: number;
  /** Automations that errored on their most recent run. */
  failing: string[];
  checkedAt: Date;
}

export class OpenClawGateway {
  constructor(
    private readonly baseUrl: string,
    private readonly adminToken: string,
  ) {}

  async listAutomations(): Promise<Automation[]> {
    const res = await this.request("GET", "/api/automations");
    return (res.automations as Automation[]) ?? [];
  }

  async addAutomation(spec: AutomationSpec): Promise<string> {
    const res = await this.request("POST", "/api/automations", this.toPayload(spec));
    return res.id as string;
  }

  async updateAutomation(id: string, spec: AutomationSpec): Promise<void> {
    await this.request("PATCH", `/api/automations/${id}`, this.toPayload(spec));
  }

  async removeAutomation(id: string): Promise<void> {
    await this.request("DELETE", `/api/automations/${id}`);
  }

  /** Force a run. Returns a runId to inspect the result later. */
  async runNow(id: string): Promise<string> {
    const res = await this.request("POST", `/api/automations/${id}/run`);
    return res.runId as string;
  }

  /**
   * Register the health check the client never sees but depends on. If a
   * tenant's Gateway stops, we need to know before they do.
   */
  async health(): Promise<GatewayHealth> {
    try {
      const automations = await this.listAutomations();
      return {
        reachable: true,
        automationCount: automations.length,
        failing: automations.filter((a) => !a.enabled).map((a) => a.externalId),
        checkedAt: new Date(),
      };
    } catch {
      return {
        reachable: false,
        automationCount: 0,
        failing: [],
        checkedAt: new Date(),
      };
    }
  }

  private toPayload(spec: AutomationSpec): Record<string, unknown> {
    const schedule =
      spec.schedule.kind === "cron"
        ? { kind: "cron", cron: spec.schedule.expr, tz: spec.schedule.tz }
        : spec.schedule.kind === "every"
          ? { kind: "every", every: spec.schedule.expr }
          : { kind: "at", at: spec.schedule.at, tz: spec.schedule.tz };

    return {
      externalId: spec.externalId,
      schedule,
      sessionTarget: spec.session,
      payload: { kind: "agentTurn", prompt: spec.prompt },
      delivery: { channel: spec.delivery.channel, mode: spec.delivery.mode },
    };
  }

  private async request(
    method: string,
    path: string,
    body?: unknown,
  ): Promise<Record<string, unknown>> {
    const res = await fetch(`${this.baseUrl}${path}`, {
      method,
      headers: {
        Authorization: `Bearer ${this.adminToken}`,
        "Content-Type": "application/json",
      },
      body: body === undefined ? undefined : JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(
        `gateway ${method} ${path} failed: ${res.status} ${text.slice(0, 300)}`,
      );
    }

    if (res.status === 204) return {};
    return (await res.json()) as Record<string, unknown>;
  }
}
