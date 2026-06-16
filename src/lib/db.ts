import { Pool } from "pg";

const globalForPg = globalThis as unknown as {
  pool?: Pool;
};

export const pool =
  globalForPg.pool ??
  new Pool({
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPg.pool = pool;
}
