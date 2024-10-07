import {z} from "zod";
import { userAuthSchema } from "@/lib/zod";

export type SignInFormData = z.infer<typeof userAuthSchema>;
