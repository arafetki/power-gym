import { type Metadata } from "next";
import SignOutButton from "@/components/sign-out-button";
import { ensureOnboarded } from "@/server/functions/onboarding";

export const metadata: Metadata = {
    title: "Dashboard"
}

export default async function Dashboard() {

    const user = await ensureOnboarded()

    return (
        <div className="space-y-4">
            <h1>Dashboard</h1>
            <h2>Hello, {user.displayName}</h2>
            <SignOutButton/>
        </div>
    );
}