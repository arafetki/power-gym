import "server-only";

import { Webhook } from "svix";
import {env} from "@/env.mjs";

export const wh = new Webhook(env.STACK_WEBHOOK_SECRET)