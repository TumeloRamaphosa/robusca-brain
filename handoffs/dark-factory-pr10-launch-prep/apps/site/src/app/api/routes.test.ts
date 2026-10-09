import { NextRequest } from "next/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { signature } from "@/lib/payfast";

const envSnapshot = { ...process.env };

function restoreEnv() {
  for (const key of Object.keys(process.env)) {
    if (!(key in envSnapshot)) delete process.env[key];
  }
  Object.assign(process.env, envSnapshot);
}

function jsonRequest(
  url: string,
  method: string,
  body: unknown,
  headers: Record<string, string> = {}
) {
  return new NextRequest(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify(body),
  });
}

function formRequest(url: string, params: URLSearchParams) {
  return new NextRequest(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });
}

beforeEach(() => {
  restoreEnv();
  vi.resetModules();
  vi.restoreAllMocks();
});

afterEach(() => {
  vi.doUnmock("@/lib/store");
  vi.doUnmock("@/lib/quickbooks");
  vi.doUnmock("@/lib/email");
  vi.unstubAllGlobals();
  restoreEnv();
});

function setEnv(name: string, value: string) {
  (process.env as Record<string, string | undefined>)[name] = value;
}

describe("factory projects admin guard", () => {
  it("returns 503 when the admin token is not configured", async () => {
    delete process.env.DARK_FACTORY_ADMIN_TOKEN;

    const { PATCH } = await import("./factory/projects/route");
    const response = await PATCH(
      jsonRequest("http://localhost/api/factory/projects", "PATCH", {})
    );

    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toEqual({
      error: "Admin auth is not configured",
    });
  });

  it("returns 401 when the bearer token is wrong", async () => {
    process.env.DARK_FACTORY_ADMIN_TOKEN = "top-secret";

    const { PATCH } = await import("./factory/projects/route");
    const response = await PATCH(
      jsonRequest(
        "http://localhost/api/factory/projects",
        "PATCH",
        {},
        { Authorization: "Bearer wrong-token" }
      )
    );

    expect(response.status).toBe(401);
    await expect(response.json()).resolves.toEqual({ error: "Unauthorized" });
  });

  it("lets an authorized request reach route validation", async () => {
    process.env.DARK_FACTORY_ADMIN_TOKEN = "top-secret";

    const { PATCH } = await import("./factory/projects/route");
    const response = await PATCH(
      jsonRequest(
        "http://localhost/api/factory/projects",
        "PATCH",
        {},
        { Authorization: "Bearer top-secret" }
      )
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({ error: "Missing project id" });
  });
});

describe("factory intake KV guard", () => {
  it("hard-fails in production when KV is missing", async () => {
    setEnv("NODE_ENV", "production");
    delete process.env.VERCEL_ENV;
    delete process.env.KV_REST_API_URL;
    delete process.env.KV_REST_API_TOKEN;

    const { POST } = await import("./factory/intake/route");

    await expect(
      POST(
        jsonRequest("http://localhost/api/factory/intake", "POST", {
          clientName: "Ada Lovelace",
          clientEmail: "ada@example.com",
          serviceId: "lead-list",
          title: "Launch prep",
        })
      )
    ).rejects.toThrow(
      "KV is required in production. Set KV_REST_API_URL and KV_REST_API_TOKEN."
    );
  });
});

describe("payfast notify signature verification", () => {
  it("rejects forged ITNs without calling fulfilment", async () => {
    const getProject = vi.fn();
    const updateProjectPayment = vi.fn();
    const updateProjectStatus = vi.fn();
    const fetchMock = vi.fn();

    vi.doMock("@/lib/store", () => ({
      getProject,
      updateProjectPayment,
      updateProjectStatus,
    }));
    vi.doMock("@/lib/quickbooks", () => ({
      createStageInvoice: vi.fn(),
      isConnected: vi.fn().mockResolvedValue(false),
      stageAmounts: vi.fn(),
    }));
    vi.doMock("@/lib/email", () => ({
      sendEmail: vi.fn(),
      invoiceEmailHtml: vi.fn(),
    }));
    vi.stubGlobal("fetch", fetchMock as typeof fetch);

    const { POST } = await import("./payfast/notify/route");

    const params = new URLSearchParams([
      ["m_payment_id", "proj-123:deposit"],
      ["payment_status", "COMPLETE"],
      ["amount_gross", "123.45"],
      ["custom_str1", "proj-123"],
      ["custom_str2", "deposit"],
      ["signature", "forged"],
    ]);

    const response = await POST(
      formRequest("http://localhost/api/payfast/notify", params)
    );

    expect(response.status).toBe(200);
    await expect(response.text()).resolves.toBe("OK");
    expect(fetchMock).not.toHaveBeenCalled();
    expect(getProject).not.toHaveBeenCalled();
    expect(updateProjectPayment).not.toHaveBeenCalled();
    expect(updateProjectStatus).not.toHaveBeenCalled();
  });

  it("accepts a valid signature before fulfilling the payment", async () => {
    const updateProjectPayment = vi.fn().mockResolvedValue(undefined);
    const updateProjectStatus = vi.fn().mockResolvedValue(undefined);
    const sendEmail = vi.fn().mockResolvedValue(undefined);
    const fetchMock = vi.fn().mockResolvedValue({
      text: async () => "VALID",
    });

    vi.doMock("@/lib/store", () => ({
      getProject: vi.fn().mockResolvedValue({
        id: "proj-123",
        title: "Dark Factory Launch",
        clientName: "Ada Lovelace",
        clientEmail: "ada@example.com",
        quotedPriceUsd: 100,
      }),
      updateProjectPayment,
      updateProjectStatus,
    }));
    vi.doMock("@/lib/quickbooks", () => ({
      createStageInvoice: vi.fn(),
      isConnected: vi.fn().mockResolvedValue(false),
      stageAmounts: (amountUsd: number) => ({
        deposit: amountUsd * 0.1,
        build: amountUsd * 0.4,
        final: amountUsd * 0.5,
      }),
    }));
    vi.doMock("@/lib/email", () => ({
      sendEmail,
      invoiceEmailHtml: vi.fn().mockReturnValue("<p>receipt</p>"),
    }));
    vi.stubGlobal("fetch", fetchMock as typeof fetch);

    const { POST } = await import("./payfast/notify/route");

    const pairs: Array<[string, string]> = [
      ["m_payment_id", "proj-123:deposit"],
      ["payment_status", "COMPLETE"],
      ["amount_gross", "123.45"],
      ["custom_str1", "proj-123"],
      ["custom_str2", "deposit"],
    ];
    const params = new URLSearchParams();
    for (const [key, value] of pairs) params.append(key, value);
    params.append("signature", signature(pairs, { includeEmpty: true }));

    const response = await POST(
      formRequest("http://localhost/api/payfast/notify", params)
    );

    expect(response.status).toBe(200);
    await expect(response.text()).resolves.toBe("OK");
    expect(fetchMock).toHaveBeenCalledOnce();
    expect(updateProjectPayment).toHaveBeenCalledWith("proj-123", "deposit");
    expect(updateProjectStatus).toHaveBeenCalledWith("proj-123", "approved");
    expect(sendEmail).toHaveBeenCalledOnce();
  });
});
