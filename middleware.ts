import { auth } from "@/lib/auth";
import { NextResponse } from "next/server"

export default auth(async (req)=>{

    const isAuthPage =
        req.nextUrl.pathname.startsWith("/login") ||
        req.nextUrl.pathname.startsWith("/register")
    if (isAuthPage) {
        if (req.auth) {
            return NextResponse.redirect(new URL("/dashboard", req.url))
        }
        return
    }

    if (!req.auth && req.nextUrl.pathname !== "/login") {
        const newUrl = new URL(`/login?from=${req.nextUrl.pathname}`, req.nextUrl.origin)
        return Response.redirect(newUrl)
    }

},
)

export const config = {
  matcher: ["/dashboard/:path*","/login","/register"],
}