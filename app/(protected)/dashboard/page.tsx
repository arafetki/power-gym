import { auth } from "@/lib/auth";


export default async function Dashboard() {

    const session = await auth()

    return (
        <div className="space-y-4">
            <h1>Dashboard</h1>
            <p>Hello, {session?.user?.name}</p>
        </div>
    );
}