import Link from "next/link";
import { Metadata } from "next";
import { SignInForm } from "@/components/sign-in-form";
import { buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
    title: "Login"
}

export default async function Login() {


    return (
        <div className="relative flex h-screen w-screen">
            <Link
                href="/"
                className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "absolute left-4 top-4 md:left-8 md:top-8"
                )}
            >
                <Icons.chevronLeft className="mr-2 h-4 w-4" /> Back
            </Link>

            <div className="flex flex-col w-full items-center justify-center lg:w-1/2">
                <div className="w-full max-w-md flex flex-col items-center gap-4 p-6">
                    <div className="w-full text-left">
                        <p className="pb-2 text-xl font-medium">Welcome Back</p>
                        <p className="text-base text-muted-foreground">Log in to your account to continue</p>
                    </div>
                    <SignInForm/>
                </div>
            </div>
            {/* Right side */}
            <div
                className="relative hidden w-1/2 flex-col-reverse rounded-medium p-10 shadow-small lg:flex rounded-l-xl"
                style={{
                backgroundImage:
                    "url(https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/black-background-texture-2.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                }}
            >
                <div className="flex flex-col items-end gap-4">
                    <div className="flex flex-row-reverse items-center gap-x-3">
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>AR</AvatarFallback>
                        </Avatar>
                        <div className="text-right">
                            <h1 className="w-full text-sm text-white">Arafet BenKilani</h1>
                            <p className="text-muted-foreground text-xs">Founder of Power Gym</p>
                        </div>
                    </div>
                    <p className="w-full text-right text-2xl text-black/60">
                        <q className="text-white font-normal italic text-pretty">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget augue nec massa
                            volutpat aliquet.
                        </q>
                    </p>
                </div>
            </div>
        </div>
    );
}