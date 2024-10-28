import "server-only";

import { stackServerApp } from '@/lib/stack-auth/app';
import { redirect } from 'next/navigation';

export async function ensureOnboarded() {

    const user = await stackServerApp.getUser({or: "redirect"});

    if (!user.clientReadOnlyMetadata?.onboarded) {
      redirect('/auth/onboarding');
    }

    return user
}
