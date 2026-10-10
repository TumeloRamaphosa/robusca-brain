import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "",
  },
  // Control plane only. Per-tenant ghost_<slug> schemas are created at
  // provisioning time and are deliberately not managed by migrations.
  schemaFilter: ["public"],
} satisfies Config;
