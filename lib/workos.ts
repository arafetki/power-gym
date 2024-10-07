import { WorkOS, CreateMagicAuthOptions, AuthenticateWithMagicAuthOptions } from '@workos-inc/node';
import {env} from "@/env.mjs";

const workos = new WorkOS(env.WORKOS_API_KEY);

export function getGoogleAuthorizationUrl(): string {
    return workos.userManagement.getAuthorizationUrl({
        clientId: env.WORKOS_CLIENT_ID,
        provider: 'GoogleOAuth',
        redirectUri: env.NEXT_PUBLIC_WORKOS_REDIRECT_URI,
    });
}

export function getMicrosoftAuthorizationUrl(): string {
    return workos.userManagement.getAuthorizationUrl({
        clientId: env.WORKOS_CLIENT_ID,
        provider: 'MicrosoftOAuth',
        redirectUri: env.NEXT_PUBLIC_WORKOS_REDIRECT_URI,
    });
}

export async function createMagicAuth(options: CreateMagicAuthOptions) {
    return workos.userManagement.createMagicAuth(options);
}

export async function authenticateWithMagicAuth(options: AuthenticateWithMagicAuthOptions) {
    return workos.userManagement.authenticateWithMagicAuth(options);
}