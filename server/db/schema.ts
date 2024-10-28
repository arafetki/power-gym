import {
  pgTable,
  text,
  varchar,
  timestamp,
  uniqueIndex,
  uuid,
  json
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey(),
  displayName: varchar("display_name", { length: 256 }),
  email: varchar("email", { length: 256 }).unique(),
  avatarURL: text("avatar_url"),
  metadata : json("meta_data"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }),
}, (table) => {
  return {
    emailIdx: uniqueIndex("idx_users_email").on(table.email),
  };
});
