import { db } from "orm/drizzle"
import { ChannelsTable } from "orm/tables/channels"

export const getChannelsSQL = async () => {
    const channels = await db.select().from(ChannelsTable).execute()

    return channels
}