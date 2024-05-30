import { serial, text, pgTable, boolean, timestamp } from "drizzle-orm/pg-core";
import { sql } from 'drizzle-orm'

export const ChannelsTable = pgTable("channels", {
    id: serial("id").primaryKey(),
    username: text("username").notNull().unique(),
    listening: boolean("listening").notNull().default(true),
    createdAt: timestamp("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
    updatedAt: timestamp("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
    accessToken: text("access_token").notNull().unique(),
})