import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import {db} from "@/server/db";
import {accounts, users, verificationTokens} from "@/server/db/schema";

export const { handlers, signIn, signOut, auth } = NextAuth({
    callbacks: {
        authorized: async ({auth}) => {
            return !!auth
        },
    },
    adapter: DrizzleAdapter(db,{
        usersTable: users,
        accountsTable: accounts,
        verificationTokensTable: verificationTokens,
    }),
    session: { strategy: "jwt" },
    providers: [
        Google,
        Resend({
            from: "onboarding@resend.dev"
        })
    ],
    pages: {
        signIn: "/login",
        signOut: "/"
    }
})