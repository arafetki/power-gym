import SignOutButton from "@/components/sign-out-button";

export default async function Dashboard() {

    return (
        <div className="space-y-4">
            <h1>Dashboard</h1>
            <SignOutButton/>
        </div>
    );
}