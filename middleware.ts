import { type NextRequest, NextResponse } from "next/server";
import { stackServerApp } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  const user = await stackServerApp.getUser();
  const isAuthPage = req.nextUrl.pathname.startsWith("/auth/login") || req.nextUrl.pathname.startsWith("/auth/register");

  if (!user) {
    if (isAuthPage) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL(`/auth/login?after_auth_return_to=${req.nextUrl.pathname}`, req.url));
  }

  if (isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  // You can add your own route protection logic here
  // Make sure not to protect the root URL, as it would prevent users from accessing static Next.js files or Stack's /handler path
  matcher: ['/auth/login', "/auth/register", '/dashboard/:path*'],
};
