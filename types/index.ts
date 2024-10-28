import {z} from "zod";
import { UserAuthSchema } from "@/lib/zod";

export type SignInFormData = z.infer<typeof UserAuthSchema>;

type APIErrorResponse = {
    error : {
        message: string
    }
}

type APISuccessResponse = {
    data: Record<string,unknown>
}

export type APIResponse = APISuccessResponse | APIErrorResponse;

export type APIRequest<T = Record<string, unknown>> = {
    data: T;
};

export type SearchParams = Record<string,string | string[] | undefined>