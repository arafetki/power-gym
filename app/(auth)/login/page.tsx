import { getGoogleAuthorizationUrl, getMicrosoftAuthorizationUrl } from "@/lib/workos";
import Link from "next/link";
import { SignInForm } from "@/components/sign-in-form";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { withAuth } from "@workos-inc/authkit-nextjs";
import { redirect } from "next/navigation";

export default async function Login() {

    const googleOAuthUrl = getGoogleAuthorizationUrl()
    const microsoftOAuthUrl = getMicrosoftAuthorizationUrl()

    const {user} = await withAuth()
    if (user) {
        redirect("/dashboard")
    }

    return (
    <div className="relative flex h-screen w-screen">
        <Link
        href="/"
        className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute left-2 top-4 md:left-8 md:top-8"
        )}
        >
        <>
            <Icons.chevronLeft className="mr-2 h-4 w-4" />
            Back
        </>
        </Link>

        {/* Login Form */}
        <div className="flex w-full items-center justify-center lg:w-1/2">
            <div className="w-full max-w-md flex flex-col items-center gap-4 p-6">
                <div className="w-full text-left">
                    <p className="pb-2 text-xl font-medium">Welcome Back</p>
                    <p className="text-base text-muted-foreground">Log in to your account to continue</p>
                </div>
                <SignInForm googleAuthUrl={googleOAuthUrl} microsoftAuthUrl={microsoftOAuthUrl}/>
            </div>
        </div>
        {/* Right side */}
        <div
            className="relative hidden w-1/2 flex-col-reverse rounded-medium p-10 shadow-small lg:flex"
            style={{
            backgroundImage:
                "url(https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/white-building.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            }}
        >
            <div className="flex flex-col items-end gap-4">
            {/* <User
                avatarProps={{
                src: "https://i.pravatar.cc/150?u=a04258a2462d826712d",
                }}
                classNames={{
                base: "flex flex-row-reverse",
                name: "w-full text-right text-black",
                description: "text-black/80",
                }}
                description="Founder & CEO at ACME"
                name="Bruno Reichert"
            /> */}
            <p className="w-full text-right text-2xl text-black/60">
                <span className="font-medium">“</span>
                <span className="font-normal italic">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget augue nec massa
                volutpat aliquet.
                </span>
                <span className="font-medium">”</span>
            </p>
            </div>
        </div>        
    </div>
    );
}