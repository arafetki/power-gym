import {z} from "zod";
import validator from "validator";
import { min } from "lodash";

export const UserAuthSchema = z.object({
    email: z.string().min(1,{message: "Email is required."}).email({message: "Invalid email address."}),
})

const UserIDSchema = z.string().describe("The unique identifier of the user");

const UserCreatedEventPayloadSchema = z.object({
    id: UserIDSchema,
    primary_email: z.string().nullish().describe("Primary email of the user"),
    display_name: z
        .string()
        .nullish()
        .describe(
        "User's display name.",
        ),
    profile_image_url: z
        .string()
        .nullish()
        .describe(
        "URL of the profile image for the user.",
        ),
    signed_up_at_millis: z
        .number()
        .describe(
        "The timestamp of the user's sign-up",
        ),
    client_metadata: z
        .record(z.string(), z.any())
        .nullish()
        .describe(
        "Client metadata. Used as a data store, accessible from the client and server side.",
        ),
    client_read_only_metadata: z
        .record(z.string(), z.any())
        .nullish()
        .describe(
        "Client Read-Only metadata. The client can read this data, but cannot modify it",
        ),
    server_metadata: z
        .record(z.string(), z.any())
        .nullish()
        .describe(
        "Server metadata. Used as a data store, only accessible from the server side.",
        ),
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


export const UserOnboardingSchema = z.object({
    fullName: z.string().min(1, { message: "Full name is required." }),
    nationalID: z
        .string()
        .min(1,{message: "National ID is required"})
        .refine(value=>validator.isIdentityCard(value,"ar-TN"), {message: "Not a valid national ID"}),
    gender: z.enum(["male", "female"],{required_error: "Gender is required"}),
    phone: z
        .string()
        .min(1,{message: "Phone number is required"})
        .refine((value=>validator.isMobilePhone(value,'ar-TN')),{message: "Not a valid phone number"})
});
