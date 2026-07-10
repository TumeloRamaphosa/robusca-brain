import fs from "fs";
import path from "path";

export type TenantRecord = {
  companyName: string;
  goals: string;
  whatsapp: string;
  tier: string;
  createdAt: string;
  status: "provisioning" | "live";
};

const DATA_DIR = path.join(process.cwd(), "data");
const TENANTS_FILE = path.join(DATA_DIR, "tenants.json");

export function loadTenants(): Map<string, TenantRecord> {
  try {
    if (!fs.existsSync(TENANTS_FILE)) return new Map();
    const raw = JSON.parse(fs.readFileSync(TENANTS_FILE, "utf8")) as Record<string, TenantRecord>;
    return new Map(Object.entries(raw));
  } catch {
    return new Map();
  }
}

export function saveTenants(tenants: Map<string, TenantRecord>) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const obj = Object.fromEntries(tenants.entries());
  fs.writeFileSync(TENANTS_FILE, JSON.stringify(obj, null, 2));
}
