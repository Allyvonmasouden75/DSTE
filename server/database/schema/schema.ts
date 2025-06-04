import { pgTable, uuid, text, integer, timestamp } from "drizzle-orm/pg-core";

// ------------------
//  USERS
// -------------------
export const users = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").unique().notNull(),
    role: text("role", { enum: ["zonalEngineer", "manager", "director", "shopkeeper", "engineer"]}).default("engineer"),
    password: text("password").notNull()

});

// ------------------
//  STOCK
// -------------------
export const stock = pgTable("stock", {
    id: uuid("id").defaultRandom().primaryKey(),
    item: text("items").notNull(),
    total: integer("total").notNull().default(0),
    status: text("status", { enum: ["available", "not available"]}).default("available"),
    userId: uuid("userId").references(() => users.id) // users table

});


// ------------------
//  ITEMS
// -------------------
export const items = pgTable("items", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    total: integer("total").default(0)
})


// ------------------
//  REQUESTS
// -------------------
export const requests = pgTable("Requests", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("userId").notNull().references(() => users.id), // referencing users table
    createdAt: timestamp("created_at").defaultNow(),
    reason: text("reason"),
    itemsId: uuid("itemsId").references(() => items.id), // referencing items table

});