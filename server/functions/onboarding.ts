import "server-only";

import { stackServerApp } from '@/lib/auth';
import { redirect } from 'next/navigation';

export async function ensureOnboarded() {

    const user = await stackServerApp.getUser({or: "redirect"});

    if (!user.serverMetadata?.onboarded) {
      redirect('/auth/onboarding');
    }

    return user
}
