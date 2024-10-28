import { type NextRequest, NextResponse } from "next/server";
import { wh } from "@/lib/svix";
import { db } from "@/server/db";
import { StackAuthEventPayloadSchema } from "@/lib/zod";
import { users } from "@/server/db/schema";
import type { InsertUserParams, UpdateUserParams } from "@/server/db/models/user";
import { DrizzleError, eq, sql } from "drizzle-orm";
import { type APIResponse } from "@/types";

export async function POST(req: NextRequest) {

    const headers = {
        "svix-id": req.headers.get("svix-id") || "",
        "svix-timestamp": req.headers.get("svix-timestamp") || "",
        "svix-signature": req.headers.get("svix-signature") || ""
    }

    const body = await req.text()

    let payload;

    try {
        payload = wh.verify(body, headers);
        const parsedPayload = StackAuthEventPayloadSchema.parse(payload);

        switch (parsedPayload.type) {
            case "user.created":
                const newUser : InsertUserParams = {
                    id: parsedPayload.data.id,
                    displayName: parsedPayload.data.display_name,
                    email: parsedPayload.data.primary_email,
                    avatarURL: parsedPayload.data.profile_image_url,
                    metadata: parsedPayload.data.client_metadata,
                    createdAt: new Date(parsedPayload.data.signed_up_at_millis)
                }
                await db.insert(users).values(newUser).onConflictDoNothing({target: users.email})
                break
            case "user.updated":
                const updatedUser: UpdateUserParams = {
                    displayName: parsedPayload.data.display_name,
                    email: parsedPayload.data.primary_email,
                    avatarURL: parsedPayload.data.profile_image_url,
                    metadata: parsedPayload.data.client_metadata,
                }
                await db.update(users).set({
                    ...updatedUser,
                    updatedAt: sql`NOW()`
                }).where(eq(users.id,parsedPayload.data.id))
                break
            case "user.deleted":
                await db.delete(users).where(eq(users.id,parsedPayload.data.id))
                break
            default:
                throw new Error("Unrecognized event type");
        }

    } catch (err) {
        console.error(err)
        if (err instanceof DrizzleError) {
            return NextResponse.json<APIResponse>({"error": {"message": "The server encountered a problem and could not process the request"}},{status: 500})
        }
        return NextResponse.json<APIResponse>({"error": {"message": "The request could not be processed due to invalid or expired input"}},{status: 400})
    }

    return new Response(null, {status: 204})
}