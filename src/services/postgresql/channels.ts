import { eq } from "drizzle-orm"
import { db } from "schema/orm/db"
import { BotConfigTable } from "schema/orm/tables/bot-config"
import { ChannelsTable } from "schema/orm/tables/channels"

export const getActiveChannels = async () => {
    const channels = await db.select({ username: ChannelsTable.username }).from(ChannelsTable).execute()

    return channels.map((c) => c.username)
}

export const getPrefix = async (channel: string) => {
    const [objWithId] = await db.select({
        id: ChannelsTable.id
    })
        .from(ChannelsTable)
        .where(eq(ChannelsTable.username, channel))
        .execute()

    if (!objWithId) throw new Error('Channel not found')

    const [objWithPrefix] = await db.select({
        prefix: BotConfigTable.prefix
    })
        .from(BotConfigTable)
        .where(eq(BotConfigTable.owner, objWithId.id))

    return objWithPrefix.prefix
}