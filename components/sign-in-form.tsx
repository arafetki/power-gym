"use client";

import { useCallback } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userAuthSchema } from "@/lib/zod";
import { signIn } from "next-auth/react";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { SignInFormData } from "@/types";


export function SignInForm() {

    const form = useForm<SignInFormData>({
        resolver: zodResolver(userAuthSchema),
        defaultValues: {
            email: "",
        }
    })

    const searchParams = useSearchParams()
    const from = searchParams.get("from")

    const SignInWithGoogle = useCallback(async () => {
        await signIn("google",{
            redirect: false,
            redirectTo: from || "/dashboard"
        })
    },[from])

    const onValidSubmit: SubmitHandler<SignInFormData> = async (formData) => {
        await signIn("resend", {
            ...formData,
            redirect: false,
            callbackUrl: from || "/dashboard",
        })
    }

    return (
        <Form {...form}>
            <Button
                variant="outline"
                onClick={SignInWithGoogle}
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