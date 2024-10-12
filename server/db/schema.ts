import {
  pgTable,
  text,
  varchar,
  timestamp,
  date,
  pgEnum,
  numeric,
  index,
  integer,
  uniqueIndex,
  char
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { nanoid } from "nanoid";
import { z } from "zod";
import { add } from "date-fns";


export const genderEnum = pgEnum("gender", ["male", "female"]);

export const members = pgTable("members", {
  id: varchar("id", { length: 10 }).primaryKey().$defaultFn(() => nanoid(10)),
  fullName: varchar("full_name", { length: 256 }).notNull(),
  email: varchar("email", { length: 256 }).notNull().unique(),
  national_id: varchar("national_id", { length: 20 }).unique(),
  phone: varchar("phone", { length: 20 }).unique(),
  dateOfBirth: date("date_of_birth"),
  gender: genderEnum("gender"),
  avatarUrl: text("avatar_url"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull(),
}, (table) => {
  return {
    emailIdx: uniqueIndex("idx_members_email").on(table.email),
  };
});

export const membersRelations = relations(members, ({ one,many }) => ({
  customer: one(customers),
  subscriptions: many(subscriptions),
  invoices: many(invoices),
  payments: many(payments),
}));

export const customers = pgTable("customers", {
  id: varchar("id",{length: 10}).primaryKey().notNull().references(()=>members.id, {onDelete: 'cascade'}),
  stripeCustomerId: varchar("stripe_customer_id", { length: 256 }).notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
})

export const customersRelations = relations(customers,({one})=>({
  member: one(members,{
    fields: [customers.id],
    references: [members.id]
  })
}))

export const genderEnumSchema = z.enum(genderEnum.enumValues);

export const planIntervalEnum = pgEnum("plan_interval", ["day", "week", "month", "year"]);

export const plans = pgTable("plans", {
  id: varchar("id", { length: 256 }).primaryKey(),
  name: varchar("name", { length: 20 }).unique().notNull(),
  description: text("description")
});

export const plansRelations = relations(plans, ({many})=>({
  prices: many(prices)
}))

export const pricingtypeEnum = pgEnum("pricing_type",['one_time', 'recurring'])
export const pricingPlanIntervalEnum = pgEnum("pricing_plan_interval",['day', 'week', 'month', 'year'])

export const prices = pgTable("prices", {
  id: varchar("id", { length: 256 }).primaryKey(),
  planId: varchar("id", { length: 256 }).references(()=>plans.id, {onDelete: 'cascade'}).notNull(),
  unitAmount: integer("unit_amount").notNull(),
  currency: char("currency",{length: 3}).notNull().default("USD"),
  type: pricingtypeEnum("pricing_type").notNull().default("one_time"),
  interval: pricingPlanIntervalEnum("pricing_plan_interval").notNull().default("month"),
  intervalCount: integer("interval_count").notNull().default(1)

})

export const pricesRelations = relations(prices,({one})=>({
  plan: one(plans,{
    fields: [prices.planId],
    references: [plans.id]
  })
}))

export const subscriptionStatusEnum = pgEnum("subscription_status", ["incomplete", "active", "expired", "cancelled"]);

export const subscriptions = pgTable("subscriptions", {
  id: varchar("id", { length: 256 }).primaryKey(),
  memberId: varchar("member_id",{length: 10}).references(() => members.id, { onDelete: 'cascade' }).notNull(),
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
  status: subscriptionStatusEnum("subscription_status").notNull().default("incomplete"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
}, (table) => {
  return {
    memberIdIdx: index("idx_subscriptions_member_id").on(table.memberId),
  };
});

export const subscriptionsRelation = relations(subscriptions, ({ one, many }) => ({
  member: one(members, {
    fields: [subscriptions.memberId],
    references: [members.id],
  }),
  invoices: many(invoices),
}));

export const subscriptionStatusEnumSchema = z.enum(subscriptionStatusEnum.enumValues);

export const invoiceStatusEnum = pgEnum("invoice_status", ["unpaid", "past_due", "paid"]);

export const invoices = pgTable("invoices", {
  id: varchar("id", { length: 256 }).primaryKey(),
  memberId: varchar("member_id",{length: 10}).references(() => members.id, { onDelete: 'cascade' }).notNull(),
  subscriptionId: varchar("subscription_id",{length: 256}).references(() => subscriptions.id, { onDelete: 'cascade' }).notNull(),
  amountDue: numeric("amount_due", { precision: 10, scale: 2 }).notNull(),
  amountPaid: numeric("amount_paid", { precision: 10, scale: 2 }).notNull().default("0"),
  status: invoiceStatusEnum("invoice_status").notNull().default("unpaid"),
  dueDate: timestamp("due_date", { withTimezone: true }).notNull().$defaultFn(() => add(new Date(), { days: 3 })),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => {
  return {
    memberIdIdx: index("idx_invoices_member_id").on(table.memberId),
    subscriptionIdIdx: index("idx_invoices_subscription_id").on(table.subscriptionId),
  };
});

export const invoicesRelations = relations(invoices, ({ one, many }) => ({
  member: one(members, {
    fields: [invoices.memberId],
    references: [members.id],
  }),
  subscription: one(subscriptions, {
    fields: [invoices.subscriptionId],
    references: [subscriptions.id],
  }),
  payments: many(payments),
}));

export const invoiceStatusEnumSchema = z.enum(invoiceStatusEnum.enumValues);

export const paymentStatusEnum = pgEnum("payment_status", ["pending", "failed", "canceled", "succeeded"]);

export const payments = pgTable("payments", {
  id: varchar("id", { length: 256 }).primaryKey(),
  memberId: varchar("member_id",{length: 10}).references(() => members.id, { onDelete: 'cascade' }).notNull(),
  invoiceId: varchar("invoice_id", { length: 256 }).references(() => invoices.id, { onDelete: 'cascade' }).notNull(),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  status: paymentStatusEnum("payment_status").notNull().default("pending"),
  paymentDate: timestamp("payment_date", { withTimezone: true }).defaultNow().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => {
  return {
    memberIdIdx: index("idx_payments_member_id").on(table.memberId),
    invoiceIdIdx: index("idx_payments_invoice_id").on(table.invoiceId),
  };
});

export const paymentsRelations = relations(payments, ({ one, many }) => ({
  invoice: one(invoices, {
    fields: [payments.invoiceId],
    references: [invoices.id],
  }),
  member: one(members, {
    fields: [payments.memberId],
    references: [members.id],
  }),
  refunds: many(refunds),
}));

export const paymentStatusEnumSchema = z.enum(paymentStatusEnum.enumValues);

export const refundStatusEnum = pgEnum("refund_status", ["pending", "succeeded", "failed", "canceled"]);

export const refunds = pgTable("refunds", {
  id: varchar("id", { length: 256 }).primaryKey(),
  paymentId: varchar("payment_id", { length: 256 }).references(() => payments.id, { onDelete: 'cascade' }).notNull(),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  reason: text("reason"),
  status: refundStatusEnum("refund_status").notNull().default("pending"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => {
  return {
    paymentIdIdx: index("idx_refunds_payment_id").on(table.paymentId),
  };
});

export const refundsRelations = relations(refunds, ({ one }) => ({
  payment: one(payments, {
    fields: [refunds.paymentId],
    references: [payments.id],
  }),
}));
