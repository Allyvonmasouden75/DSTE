import { pgTable, uuid, text, integer, timestamp, boolean } from "drizzle-orm/pg-core";

// ------------------
//  USERS
// -------------------
export const users = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").unique().notNull(),
    role: text("role", { 
        enum: ["zonalEngineer", "manager", "director", "shopkeeper", "engineer"]
    }).default("engineer"),
    password: text("password").notNull()
});

// ------------------
//  ITEMS
// -------------------
export const items = pgTable("items", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    description: text("description"), // Added for better item info
    total: integer("total").default(0).notNull()
});

// ------------------
//  REQUESTS
// -------------------
export const requests = pgTable("requests", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").notNull().references(() => users.id),
    itemId: uuid("item_id").notNull().references(() => items.id),
    quantity: integer("quantity").notNull(),
    reason: text("reason").notNull(),
    status: text("status", {
        enum: ["pending", "zonal_approved", "manager_approved", "director_approved", "completed", "rejected"]
    }).default("pending"),
    createdAt: timestamp("created_at").defaultNow(),
    completedAt: timestamp("completed_at"),
    isActive: boolean("is_active").default(true)
});

// ------------------
//  APPROVALS
// -------------------
export const approvals = pgTable("approvals", {
    id: uuid("id").defaultRandom().primaryKey(),
    requestId: uuid("request_id").notNull().references(() => requests.id),
    approverId: uuid("approver_id").notNull().references(() => users.id),
    role: text("role", {
        enum: ["zonalEngineer", "manager", "director", "shopkeeper"]
    }).notNull(),
    status: text("status", {
        enum: ["approved", "rejected", "pending"]
    }).default("pending"),
    comments: text("comments"),
    approvedAt: timestamp("approved_at"),
    createdAt: timestamp("created_at").defaultNow()
});

// ------------------
//  STOCK MOVEMENT
// -------------------
export const stockMovement = pgTable("stock_movement", {
    id: uuid("id").defaultRandom().primaryKey(),
    itemId: uuid("item_id").notNull().references(() => items.id),
    quantity: integer("quantity").notNull(),
    movementType: text("movement_type", {
        enum: ["in", "out", "adjustment"]
    }).notNull(),
    requestId: uuid("request_id").references(() => requests.id),
    processedById: uuid("processed_by").references(() => users.id),
    createdAt: timestamp("created_at").defaultNow()
});