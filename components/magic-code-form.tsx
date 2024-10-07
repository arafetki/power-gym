"use client";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import {  useRef } from "react";
import {signInWithMagicAuthAction} from "@/server/actions";
import { useRouter } from "next/navigation";

type MagicCodeFormProps = {
    email: string
}

export function MagicCodeForm({email}: MagicCodeFormProps) {

    const formRef = useRef<HTMLFormElement>(null)
    const router = useRouter()

    const handleSbumit = async (code: string) => {
        console.log(code)
        const {authResponse,error} = await signInWithMagicAuthAction(email,code)
        if (error) {
            console.error(error)
            return
        }
        console.log(authResponse)
        router.push("/")
    }

    return (
        <form
            ref={formRef}
            className="space-y-2 p-12 rounded-2xl border-2"
        >
            <label htmlFor="code">Enter the code sent to <br/> <strong>{email}</strong></label>
            <InputOTP 
                maxLength={6} 
                name="code"
                id="code"
                autoComplete="one-time-code" 
                inputMode="numeric"
                type="text"
                autoFocus
                onChange={(e)=>{if (e.length===6) {
                    handleSbumit(e)
                }}}
            >
                <InputOTPGroup>
                    <InputOTPSlot index={0}/>
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                </InputOTPGroup>
            </InputOTP>
        </form>
    );
}