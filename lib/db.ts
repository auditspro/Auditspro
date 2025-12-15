import { Pool } from "pg";

const globalForPg = globalThis as unknown as {
  __pgPool?: Pool;
};

function createPool() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }

  const shouldUseSsl = connectionString.includes("sslmode=require");

  return new Pool({
    connectionString,
    ...(shouldUseSsl ? { ssl: { rejectUnauthorized: false } } : {}),
  });
}

export const pool = globalForPg.__pgPool ?? createPool();

if (process.env.NODE_ENV !== "production") {
  globalForPg.__pgPool = pool;
}
