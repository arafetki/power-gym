import { type NextRequest } from "next/server";
import { StackAuthMiddleware } from "@/lib/stack-auth/middleware";

export async function middleware(req: NextRequest) {
  return await StackAuthMiddleware(req)
}

export const config = {
  matcher: ['/auth/login', "/auth/register", "/auth/onboarding", '/dashboard/:path*', '/account'],
};
