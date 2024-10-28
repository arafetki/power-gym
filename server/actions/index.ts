"use server";

import { UserOnboardingSchema } from '@/lib/zod';
import { stackServerApp } from '@/lib/stack-auth/app';
import _ from "lodash";

export async function handleUserOnboarding(formData: FormData) {

    const data = Object.fromEntries(formData.entries());

    try {

        const parsedData = UserOnboardingSchema.parse(data)

        const user = await stackServerApp.getUser()
        if (!user) {
            throw new Error("user must be authenticated")
        }

        const transformedData = Object.fromEntries(
            Object.entries(parsedData).map(([key, value]) => [_.snakeCase(key), value])
        );

        await user.update({
            clientMetadata: transformedData,
            clientReadOnlyMetadata: {onboarded: true}
        })

    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Internal server error";
        throw new Error(errorMessage);
    }

}