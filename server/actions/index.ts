"use server";

import { createClient } from '@/lib/supabase/server';
import {env} from "@/env.mjs";
import { userAuthSchema } from '@/lib/zod';
import { redirect } from 'next/navigation';


export async function loginWithOtp(formData: FormData, captchaToken: string) {

    const supabase = createClient()

    const parsed = userAuthSchema.safeParse(Object.fromEntries(formData))
    if (!parsed.success) {
        throw new Error(parsed.error.message)
    }
    const { error } = await supabase.auth.signInWithOtp({
        email: parsed.data.email,
        options: {
            shouldCreateUser: false,
            emailRedirectTo: `${env.NEXT_PUBLIC_SITE_URL}/dashboard`,
            captchaToken: captchaToken,
        }
    })

    if (error) {
        console.error(error)
        throw new Error(error.message)
    }

}


export async function loginWithGoogleOAuth() {

    const supabase = createClient()
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: `${env.NEXT_PUBLIC_SITE_URL}/api/auth/callback`,
        }
    })

    if (error) {
        throw new Error(error.message)
    }

    if (data.url) {
        console.log(data.url)
        redirect(data.url)
    }
    
}

// export async function signup(formData: FormData) {
//   const supabase = createClient()

//   const data = {
//     email: formData.get('email') as string,
//     password: formData.get('password') as string,
//   }

//   const { error } = await supabase.auth.signUp(data)

//   if (error) {
//     redirect('/error')
//   }

//   revalidatePath('/', 'layout')
//   redirect('/')
// }
