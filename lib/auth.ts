import "server-only";

import { StackServerApp } from "@stackframe/stack";

export const stackServerApp = new StackServerApp({
  tokenStore: "nextjs-cookie", // storing auth tokens in cookies
  urls: {
    home: "/",
    signIn: "/auth/login",
    afterSignIn: "/dashboard",
    signUp: "/auth/register",
    afterSignOut: "/",
    handler: `${process.env.NEXT_PUBLIC_SITE_URL}/auth`
  }
});
