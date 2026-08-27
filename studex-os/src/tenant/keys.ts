import { randomBytes, scrypt as scryptCb, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(scryptCb);

/**
 * Workspace keys.
 *
 * The client authenticates to Studex and only to Studex. We issue the key;
 * we never hand a client a vendor's key. Whoever issues the key owns the
 * customer — hand out a third-party key and churn becomes their upsell.
 */

const KEY_BYTES = 32;
const SCRYPT_KEYLEN = 64;

export interface IssuedKey {
  /** Shown to the client exactly once. Never stored. */
  secret: string;
  /** Stored for display and lookup: "sk_studex_live_XYZ_a41c". */
  prefix: string;
  /** Stored. salt:hash */
  hash: string;
}

export async function issueKey(tenantSlug: string): Promise<IssuedKey> {
  const material = randomBytes(KEY_BYTES).toString("base64url");
  const shortId = randomBytes(2).toString("hex");
  const prefix = `sk_studex_live_${tenantSlug.toUpperCase()}_${shortId}`;
  const secret = `${prefix}_${material}`;

  return { secret, prefix, hash: await hashKey(secret) };
}

export async function hashKey(secret: string): Promise<string> {
  const salt = randomBytes(16);
  const derived = (await scrypt(secret, salt, SCRYPT_KEYLEN)) as Buffer;
  return `${salt.toString("hex")}:${derived.toString("hex")}`;
}

export async function verifyKey(secret: string, stored: string): Promise<boolean> {
  const [saltHex, hashHex] = stored.split(":");
  if (!saltHex || !hashHex) return false;

  const derived = (await scrypt(
    secret,
    Buffer.from(saltHex, "hex"),
    SCRYPT_KEYLEN,
  )) as Buffer;
  const expected = Buffer.from(hashHex, "hex");

  return derived.length === expected.length && timingSafeEqual(derived, expected);
}

/** Parse the tenant slug out of a key prefix without a database round trip. */
export function tenantSlugFromKey(secret: string): string | null {
  const match = /^sk_studex_live_([A-Z0-9]+)_[0-9a-f]{4}_/.exec(secret);
  return match?.[1]?.toLowerCase() ?? null;
}
