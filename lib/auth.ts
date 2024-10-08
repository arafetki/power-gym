import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
// import { DrizzleAdapter } from "@auth/drizzle-adapter";
import Resend from "next-auth/providers/resend";

export const { handlers, signIn, signOut, auth } = NextAuth({
    callbacks: {
        authorized: async ({auth}) => {
            return !!auth
        }
    },
    // adapter: DrizzleAdapter(),
    providers: [
        Google,
        Resend
    ],
    pages: {
        signIn: "/login",
    }
})