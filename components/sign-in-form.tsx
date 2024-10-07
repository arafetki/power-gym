"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { userAuthSchema } from "@/lib/zod";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { createMagicAuthAction } from "@/server/actions";
import { safeAsync } from "@/lib/utils";

import type { SignInFormData } from "@/types";


type SignInFormProps = {
    googleAuthUrl: string
    microsoftAuthUrl: string
}

export function SignInForm({googleAuthUrl,microsoftAuthUrl}: SignInFormProps) {

    const form = useForm<SignInFormData>({
        resolver: zodResolver(userAuthSchema),
        defaultValues: {
            email: "",
            remember: false,
        }
    })

    const router = useRouter()

    const onValidSubmit: SubmitHandler<SignInFormData> = async (formData) => {
        const [error,magicAuth] = await safeAsync(createMagicAuthAction(formData))
        if (error) {
            console.error(error)
            return form.setError("root",{
                message: "oops"
            })
        }
        console.log(magicAuth)
        router.push(`/magic-code?email=${formData.email}`)
    }

    return (
        <Form {...form}>
            <div className="flex w-full flex-col gap-2">
                <Button
                    variant="outline"
                    asChild
                >
                    <Link href={googleAuthUrl}><Icons.google className="size-6 mr-2"/> Continue with Google</Link>
                </Button>
                <Button
                    variant="outline"
                    asChild
                >
                    <Link href={microsoftAuthUrl}><Icons.microsoft className="size-6 mr-2"/> Continue with Microsoft</Link>
                </Button>
            </div>
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
                <FormField
                    control={form.control}
                    name="remember"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 shadow">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    className="rounded-md"
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel className="text-sm font-normal">
                                    Remember for 15 days.
                                </FormLabel>
                            </div>
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