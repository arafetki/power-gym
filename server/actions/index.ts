"use server";

import { signIn } from "@/lib/auth";

export async function SignInWithGoogleAction({redirectTo}:{redirectTo?: string}) {
    await signIn("google",{
        redirectTo: redirectTo,
    })
}
