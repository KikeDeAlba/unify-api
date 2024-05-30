import { eq } from "drizzle-orm"
import { db } from "orm/drizzle"
import { ChannelsTable } from "orm/tables/channels"

export const getChannelsSQL = async () => {
    const channels = await db.select({
        id: ChannelsTable.id,
        username: ChannelsTable.username,
        createdAt: ChannelsTable.createdAt,
        updatedAt: ChannelsTable.updatedAt,
    }).from(ChannelsTable).execute()

    return channels
}

export const getChannel = async (username: string) => {
    const [channel] = await db.select({
        id: ChannelsTable.id,
        username: ChannelsTable.username,
        createdAt: ChannelsTable.createdAt,
        updatedAt: ChannelsTable.updatedAt,
    }).from(ChannelsTable).where(eq(ChannelsTable.username, username)).execute()

    if (!channel) throw new Error('Channel not found')

    return channel
}

export const isListening = async (username: string) => {
    const [channel] = await db.select({
        listening: ChannelsTable.listening
    }).from(ChannelsTable).where(eq(ChannelsTable.username, username)).execute()

    if (!channel) throw new Error('Channel not found')

    return channel.listening
}