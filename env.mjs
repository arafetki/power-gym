import { createEnv } from "@t3-oss/env-nextjs";
import {z} from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL:z.string().url(),
    UPLOADTHING_TOKEN: z.string().min(1),
    UPLOADTHING_APP_ID: z.string().min(1),
    STACK_SECRET_SERVER_KEY: z.string().min(1),
    STACK_WEBHOOK_SECRET: z.string().min(1),
    NODE_ENV: z
      .enum(["development", "staging", "production"])
      .default("development"),
  },
  client: {
    NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY: z.string().min(1),
    NEXT_PUBLIC_STACK_PROJECT_ID: z.string().min(1),
    NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY: z.string().min(1),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    UPLOADTHING_TOKEN: process.env.UPLOADTHING_TOKEN,
    UPLOADTHING_APP_ID: process.env.UPLOADTHING_APP_ID,
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY,
    NEXT_PUBLIC_STACK_PROJECT_ID: process.env.NEXT_PUBLIC_STACK_PROJECT_ID,
    NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY: process.env.NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY,
    STACK_SECRET_SERVER_KEY: process.env.STACK_SECRET_SERVER_KEY,
    STACK_WEBHOOK_SECRET: process.env.STACK_WEBHOOK_SECRET,

  },
  emptyStringAsUndefined: true,
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});