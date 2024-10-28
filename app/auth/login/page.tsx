"use client";

import SignIn from "@/components/sign-in-form";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icons } from "@/components/icons";
import { Quote } from "@/config";
import { cn } from "@/lib/utils";
import { useStackApp, useUser } from "@stackframe/stack";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { APP_NAME } from "@/config";

export default async function Login() {

    const user = useUser()
    const router = useRouter()
    const app = useStackApp()
    
    useEffect(()=>{
        if (user) {
            router.push(app.urls.afterSignIn)
        }
    },[user])

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
                    <SignIn/>
                </div>
            </div>
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
                            <AvatarImage src={Quote.author.avatarURL} />
                            <AvatarFallback>{Quote.author.name.slice(0,2)}</AvatarFallback>
                        </Avatar>
                        <div className="text-right">
                            <h1 className="w-full text-sm text-white">{Quote.author.name}</h1>
                            <p className="text-muted-foreground text-xs">Founder of ${APP_NAME}</p>
                        </div>
                    </div>
                    <p className="w-full text-right text-2xl text-black/60">
                        <q className="text-white font-normal italic text-pretty">{Quote.q}</q>
                    </p>
                </div>
            </div>
        </div>
    );
}