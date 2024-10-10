import {env} from "@/env.mjs"
import type {Config} from "drizzle-kit";

export default {
  schema: "./server/db/schema.ts", 
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: env.SUPABASE_DB_URL,
  },
} satisfies Config;