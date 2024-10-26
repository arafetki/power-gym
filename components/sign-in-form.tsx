"use client";

import Link from "next/link";
import OAuthButton from '@/components/oauth-button';
import { useStackApp } from "@stackframe/stack";
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { userAuthSchema } from "@/lib/zod";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import type { SignInFormData } from "@/types";

export default function SignIn() {

    const app = useStackApp()

    const form = useForm<SignInFormData>({
        resolver: zodResolver(userAuthSchema),
        defaultValues: {
            email: "",
        }
    });

    const onValidSubmit: SubmitHandler<SignInFormData> = async (data) => {
        const {status} = await app.sendMagicLinkEmail(data.email)
        if (status==="error") {
            return toast.error("Uh oh! Something went wrong.")
        }
    }

    return (
        <Form {...form}>
            <div className='w-full flex justify-center gap-2'>
                <OAuthButton 
                    provider='google'
                    className='grow'
                />
                <OAuthButton 
                    provider='microsoft'
                    className='grow'
                />
            </div>
            <div className="flex w-full items-center gap-4 py-2">
                <Separator className="flex-1" />
                <p className="shrink-0 text-xs text-muted-foreground">OR</p>
                <Separator className="flex-1" />
            </div>
            <form onSubmit={form.handleSubmit(onValidSubmit)} className='w-full flex flex-col gap-4'>
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
                    disabled={form.formState.isSubmitting}
                >
                    Sign In with Email
                </Button>
            </form>
            <p className="text-center text-sm">
                Need to create an account?&nbsp;
                <Link href="/auth/register" className="text-cyan-500 hover:underline">
                    Sign Up
                </Link>
            </p>
        </Form>
    );
}