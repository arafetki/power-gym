"use server";

import { env } from "@/env.mjs";
import { createMagicAuth, authenticateWithMagicAuth } from "@/lib/workos";
import { userAuthSchema } from "@/lib/zod";
import type { SignInFormData } from "@/types";


export async function createMagicAuthAction(formData: SignInFormData) {

    const parsedData = userAuthSchema.parse(formData)
    return  await createMagicAuth({
        email: parsedData.email,
    });
}

export async function signInWithMagicAuthAction(email: string,code: string) {
  try {
    const authResponse = await authenticateWithMagicAuth({
      clientId: env.WORKOS_CLIENT_ID,
      code: code,
      email: email,
    });

    return {authResponse,error: null}
  } catch (error) {
    return {authResponse: null, error: JSON.parse(JSON.stringify(error)) };
  }
}