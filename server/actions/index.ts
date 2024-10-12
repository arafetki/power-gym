"use server";

export async function loginWithOtp(formData: FormData, captchaToken: string) {
    console.log(formData,captchaToken)
}


export async function loginWithGoogleOAuth() {
    console.log("Google oAuth")
}
