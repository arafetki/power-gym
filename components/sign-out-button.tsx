"use client";

import { Button, type ButtonProps } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function SignOutButton({...props}: ButtonProps) {

    const router = useRouter();
    
    const logout = async () => {
        const supabase = createClient();
        try {
            await supabase.auth.signOut()
        } catch(err) {
            console.error("Could not sign out", err);
        } finally {
            router.replace("/login");
        }
    }

    return (
        <Button {...props} onClick={logout}>Log Out</Button>
    );
}