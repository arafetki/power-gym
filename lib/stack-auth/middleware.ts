import { stackServerApp } from "@/lib/stack-auth/app";
import { NextResponse, type NextRequest } from "next/server";


export async function StackAuthMiddleware(req: NextRequest) {

    let stackResponse = NextResponse.next({
        request: req,
    })

    const user = await stackServerApp.getUser();
    const isAuthPage = req.nextUrl.pathname.startsWith(stackServerApp.urls.signIn) || req.nextUrl.pathname.startsWith(stackServerApp.urls.signUp);

    if (!user) {

        if (isAuthPage) return stackResponse

        return NextResponse.redirect(new URL(`${stackServerApp.urls.signIn}?after_auth_return_to=${req.nextUrl.pathname}`, req.url));
    }

    if (isAuthPage) return NextResponse.redirect(new URL(stackServerApp.urls.afterSignIn, req.url));

    return stackResponse
}