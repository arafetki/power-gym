import { stackServerApp } from "@/lib/stack-auth/app";
import { redirect } from "next/navigation";
import Onboarding from "@/components/onboarding-form";
import { APP_NAME } from "@/config";

export default async function Page() {

    const user = await stackServerApp.getUser({or: "redirect"})
    if (user.clientReadOnlyMetadata?.onboarded) {
        redirect("/dashboard")
    }

    return (
        <div className="w-screen h-screen flex">
            <section 
                className="hidden w-[45%] p-10 shadow-small lg:flex"
                style={{
                backgroundImage:
                    "url(https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/black-background-texture-2.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                }}
            />
            <section className="flex flex-col w-full items-center justify-center gap-7 p-6 lg:w-[55%]">
                <div className="space-y-4 text-center">
                    <h2 className="text-md lg:text-lg">Welcome to {APP_NAME}</h2>
                    <h1 className="font-semibold text-3xl lg:text-4xl">Let&apos;s Get You Onboard</h1>
                </div>
                <Onboarding/>
            </section>
        </div>
    );
}