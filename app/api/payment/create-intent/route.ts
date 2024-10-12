import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";
import { env } from "@/env.mjs";
import { CreatePaymentIntentRequestSchema } from "@/lib/zod";
import { ZodError } from "zod";
import { convertToSubCurreny } from "@/lib/utils";
import { createClient } from '@/lib/supabase/server';
import type { APIResponse } from "@/types";

const stripe = new Stripe(env.STRIPE_SECRET_KEY!, {
  typescript: true,
  apiVersion: "2024-09-30.acacia",
});

export async function POST(req: NextRequest): Promise<NextResponse<APIResponse>> {

    try {
        const { data } = await req.json();
        const {amount} = CreatePaymentIntentRequestSchema.parse(data)

        const authToken = req.headers.get('Authorization')?.split(" ")[1];
        if (!authToken) {
            return new NextResponse(JSON.stringify({ error: { message: 'Authentication required'}}), {
                status: 401
            })
        }
        const supabase = createClient()
        const { data: user, error: authError } = await supabase.auth.getUser(authToken)
        if (authError || !user) {
            return new NextResponse(JSON.stringify({ error: { message: 'Unauthorized'}}), {
                status: 401,
            });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: convertToSubCurreny(amount),
            currency: "USD"
        })

        return new NextResponse(JSON.stringify({ data: { client_secret: paymentIntent.client_secret} }), { status: 200 });

    } catch(error) {

        console.error('Error creating payment intent:', error);

        if (error instanceof ZodError ) {
            return new NextResponse(JSON.stringify({ error: { message: 'Invalid request data'} }), {
                status: 400,
            });
        }

        return new NextResponse(JSON.stringify({ error: { message: 'Failed to create payment intent'} }), {
            status: 500,
        });
    }
}