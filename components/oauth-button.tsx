"use client";

import { useCallback } from "react";
import { Button, ButtonProps, buttonVariants } from "@/components/ui/button";
import { useStackApp } from "@stackframe/stack";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";


interface OauthButtonProps extends ButtonProps {
    provider: "google" | "microsoft"
}

const providers = {
    google: {
        icon: <Icons.google className="size-4"/>,
        variant: "outline" as VariantProps<typeof buttonVariants>["variant"]
    },
    microsoft: {
        icon: <Icons.microsoft className="size-4"/>,
        variant: "outline" as VariantProps<typeof buttonVariants>["variant"]
    },
};

export default function OAuthButton({provider,className,...rest}: OauthButtonProps) {

    const app = useStackApp()

    const signInWithProvider = useCallback(async () => {
        await app.signInWithOAuth(provider)
    },[provider])

    const { icon, variant} = providers[provider];

    return (
        <Button onClick={signInWithProvider} variant={variant} className={cn("py-5",className)} {...rest}>
            {icon}
        </Button>
    );
}