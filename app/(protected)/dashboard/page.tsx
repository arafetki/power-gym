import { withAuth, signOut } from '@workos-inc/authkit-nextjs';
import { Button } from '@/components/ui/button';

export default async function Dashboard() {

    const {user} = await withAuth({ ensureSignedIn: true })

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Hello, {user.firstName}</p>
            <form 
                action={async ()=>{
                    "use server";
                    await signOut();
                }}
            >
                <Button type='submit'>Sign Out</Button>
            </form>
        </div>
    );
}