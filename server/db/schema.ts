import { nanoid } from "@/lib/nanoid";
import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  varchar,
  timestamp,
  pgEnum,
  uniqueIndex,
  uuid,
  char,
  smallint,
} from "drizzle-orm/pg-core";


export const users = pgTable("users", {
  id: uuid("id").primaryKey(),
  displayName: varchar("display_name", { length: 256 }).notNull(),
  email: varchar("email", { length: 256 }).notNull().unique(),
  avatarURL: text("avatar_url"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }),
}, (table) => {
  return {
    emailIdx: uniqueIndex("idx_users_email").on(table.email),
  };
});


export const genderEnum = pgEnum("gender", ["male", "female"]);

export const profiles = pgTable("profiles",{
  id: char("id",{length: 7}).primaryKey().$default(()=>nanoid()),
  userID: uuid("user_id").notNull().unique().references(()=>users.id,{onDelete: "cascade"}),
  firstName: varchar("first_name",{length: 256}).notNull(),
  lastName: varchar("last_name",{length: 256}),
  nationalID: char("national_id", { length: 8 }).unique().notNull(),
  phone: char("phone", { length: 8 }).unique(),
  gender: genderEnum("gender").notNull(),
  age: smallint("age").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }),
},(table)=>({
  nationalIDIdx: uniqueIndex("idx_profiles_national_id").on(table.nationalID),
  userIDIdx: uniqueIndex("idx_profiles_user_id").on(table.userID),
}))

export const profilesRelations = relations(profiles,({one})=>({
  user: one(users,{
    fields: [profiles.userID],
    references: [users.id]
  })
}))