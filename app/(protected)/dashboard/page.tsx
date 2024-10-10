import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

import SignOutButton from '@/components/sign-out-button';

export default async function Dashboard() {

    const supabase = createClient()
    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
        redirect('/login')
    }    

    return (
        <div className="space-y-4">
            <h1>Dashboard</h1>
            <p>Hello, {data.user.email}</p>
            <SignOutButton/>
        </div>
    );
}