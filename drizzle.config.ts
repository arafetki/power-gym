import {env} from "@/env"
import type {Config} from "drizzle-kit";

export default {
  schema: "./server/db/schema.ts", 
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
} satisfies Config;