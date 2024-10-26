import {z} from "zod";

export const UserAuthSchema = z.object({
    email: z.string().min(1,{message: "Email is required."}).email({message: "Invalid email address."}),
})


const UserIDSchema = z.string().describe("The unique identifier of this user");

const UserCreatedEventPayloadSchema = z.object({
    id: UserIDSchema,
    primary_email: z.string().describe("Primary email"),
    display_name: z
        .string()
        .describe(
        "Human-readable user display name. This is not a unique identifier.",
        ),
    profile_image_url: z
        .string()
        .nullish()
        .describe(
        "URL of the profile image for user. Can be a Base64 encoded image. Please compress and crop to a square before passing in.",
        ),
    signed_up_at_millis: z
        .number()
        .describe(
        "The timestamp of the user's sign-up",
        ),
    last_active_at_millis: z.number().describe("The timestamp of the user's most recent sign-in"),
})

const UserUpdatedEventPayloadSchema = UserCreatedEventPayloadSchema;

const UserDeletedEventPayloadSchema = z.object({
    id: UserIDSchema,
});

export const StackAuthEventPayloadSchema = z.discriminatedUnion("type", [
    z.object({
        type: z.literal("user.created"),
        data: UserCreatedEventPayloadSchema,
    }),
    z.object({
        type: z.literal("user.updated"),
        data: UserUpdatedEventPayloadSchema,
    }),
    z.object({
        type: z.literal("user.deleted"),
        data: UserDeletedEventPayloadSchema,
    }),
]);