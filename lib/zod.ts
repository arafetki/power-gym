import {z} from "zod";

export const userAuthSchema = z.object({
    email: z.string().min(1,{message: "Email is required."}).email({message: "Invalid email address."}),
})

export const CreatePaymentIntentRequestSchema = z.object({
    amount: z.coerce.number()
})