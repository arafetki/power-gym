import {env} from "@/env.mjs"
import type {Config} from "drizzle-kit";

export default {
  schema: "./server/db/schema.ts", 
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: env.AUTH_DRIZZLE_URL,
  },
} satisfies Config;