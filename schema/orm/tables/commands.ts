
import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { sql } from 'drizzle-orm'
import { ChannelsTable } from "./channels";

export const CommandsTable = pgTable("commands", {
    id: serial("id").primaryKey(),
    command: text("command").notNull(),
    description: text("description").notNull(),
    function: text("function").notNull(),
    owner: serial("owner").notNull().unique().references(() => ChannelsTable.id),
    createdAt: timestamp("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
    updatedAt: timestamp("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`)
})