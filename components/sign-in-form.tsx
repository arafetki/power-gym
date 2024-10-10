"use client";

import React from "react";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userAuthSchema } from "@/lib/zod";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { loginWithOtp, loginWithGoogleOAuth } from "@/server/actions";
import { safeAsync } from "@/lib/utils";
import { Turnstile } from '@marsidev/react-turnstile'
import { env } from "@/env.mjs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { TurnstileInstance } from '@marsidev/react-turnstile';
import type { SignInFormData } from "@/types";


export function SignInForm() {

    const form = useForm<SignInFormData>({
        resolver: zodResolver(userAuthSchema),
        defaultValues: {
            email: "",
        }
    })

    const captchaRef = React.useRef<TurnstileInstance | null>(null)

    const onValidSubmit: SubmitHandler<SignInFormData> = async (data) => {

        const formData = new FormData();
        (Object.keys(data) as Array<keyof typeof data>).forEach(key => {
            formData.append(key, data[key]);
        })

        const captchaToken = captchaRef.current?.getResponse()
        if (!captchaToken) {
            return form.setError("root",{
                message: "Please complete the CAPTCHA to continue.",
            })
        }

        const [error] = await safeAsync(loginWithOtp(formData,captchaToken))
        if (error) {
            switch (error.message) {
                case "Signups not allowed for otp":
                    return toast.info("If this email is associated with an account, a sign-in link will be sent to you.", { position: "bottom-left" })
                case "captcha protection: request disallowed (timeout-or-duplicate)":
                    form.setError("root",{
                        message: "Bad CAPTCHA.",
                    })
                    return captchaRef.current?.reset()
                default:
                    return toast.error("Uh oh! Something went wrong.",{ position: "bottom-left" })
            }

        }

        toast.info("If this email is associated with an account, a sign-in link will be sent to you.", { position: "bottom-left" })
        captchaRef.current?.reset()
    }

    const loginWithGoogle = async () => {
        const [error] = await safeAsync(loginWithGoogleOAuth())
        if (error) {
            console.error(error)
        }
    }

    return (
        <Form {...form}>
            <Button
                variant="outline"
                onClick={loginWithGoogle}
                className="w-full font-normal"
            >
                <Icons.google className="size-5 mr-2"/> Continue with Google
            </Button>
            <div className="flex w-full items-center gap-4 py-2">
                <Separator className="flex-1" />
                <p className="shrink-0 text-xs text-muted-foreground">OR</p>
                <Separator className="flex-1" />
            </div>
            <form onSubmit={form.handleSubmit(onValidSubmit)} className="flex w-full flex-col gap-4">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-medium">Email</FormLabel>
                            <FormControl>
                                <Input 
                                    id="email"
                                    type="email"
                                    placeholder="Your email address"
                                    autoComplete="email"
                                    autoCapitalize="none"
                                    autoCorrect="off"
                                    required
                                    disabled={form.formState.isSubmitting}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    type="submit"
                    size="lg"
                    className="rounded-lg"
                    disabled={form.formState.isSubmitting}
                >
                    <Icons.mail className="size-5 mr-2"/> Continue with Email
                </Button>
                <div>
                    <Turnstile
                        siteKey={env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY}
                        ref={captchaRef}
                        onError={()=>{
                            captchaRef.current?.reset()
                        }}
                    />
                    {form.formState.errors.root && <span className="text-sm text-red-800">{form.formState.errors.root.message}</span> }
                </div>

            </form>
            <p className="text-center text-sm">
                Need to create an account?&nbsp;
                <Link href="/register" className="text-cyan-500 hover:underline">
                    Sign Up
                </Link>
            </p>
        </Form>
    );
}