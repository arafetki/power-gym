import {
  pgTable,
  text,
} from "drizzle-orm/pg-core"

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  fullName: text("full_name"),
  email: text("email").unique(),
})

