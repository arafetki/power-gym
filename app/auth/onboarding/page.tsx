import { stackServerApp } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Page() {

    const user = await stackServerApp.getUser({or: "redirect"})
    if (user.serverMetadata?.onboarded) {
        redirect("/dashboard")
    }

    return (
        <div>
            <h1>Onboarding Page</h1>
        </div>
    );
}