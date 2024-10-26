import { InferInsertModel, InferSelectModel } from "drizzle-orm"
import { users } from "@/server/db/schema"

export type User = InferSelectModel<typeof users>
export type InsertUserParams = InferInsertModel<typeof users>
export type UpdateUserParams = Omit<InsertUserParams,"id" | "createdAt">