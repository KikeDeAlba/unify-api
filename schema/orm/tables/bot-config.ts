import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { sql } from 'drizzle-orm'
import { ChannelsTable } from "./channels";

export const BotConfigTable = pgTable("bot_config", {
    id: serial("id").primaryKey(),
    prefix: text("prefix").notNull().default('UnifyOfficialBot'),
    owner: serial("owner").notNull().unique().references(() => ChannelsTable.id),
    createdAt: timestamp("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
    updatedAt: timestamp("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`)
})