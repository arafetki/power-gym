'use client';

import { useEffect } from 'react';
import { useUser } from '@stackframe/stack';
import { useRouter } from 'next/navigation';

export function useOnboarded() {

    const user = useUser({or: "redirect"});
    const router = useRouter();

    useEffect(() => {
        if (!user.clientReadOnlyMetadata?.onboarded) {
            router.push('/auth/onboarding');
        }
    }, [user]);

    return user
}