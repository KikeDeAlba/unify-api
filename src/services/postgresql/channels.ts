import { and, eq } from "drizzle-orm"
import { db } from "schema/orm/db"
import { BotConfigTable } from "schema/orm/tables/bot-config"
import { ChannelsTable } from "schema/orm/tables/channels"
import { CommandsTable } from "schema/orm/tables/commands"

export const getActiveChannels = async () => {
    const channels = await db.select({ username: ChannelsTable.username }).from(ChannelsTable).execute()

    return channels.map((c) => c.username)
}

export const getIdByUsername = async (username: string) => {
    const [objWithId] = await db.select({
        id: ChannelsTable.id
    })
        .from(ChannelsTable)
        .where(eq(ChannelsTable.username, username))
        .execute()

    return objWithId.id
}

export const getPrefix = async (channel: string) => {
    const userId = await getIdByUsername(channel)

    const [objWithPrefix] = await db.select({
        prefix: BotConfigTable.prefix
    })
        .from(BotConfigTable)
        .where(eq(BotConfigTable.owner, userId))

    return objWithPrefix.prefix
}

export const findCommand = async (channel: string, command: string) => {
    const userId = await getIdByUsername(channel)

    const [objWithCommand] = await db.select({
        command: CommandsTable.command,
        description: CommandsTable.description,
        function: CommandsTable.function
    })
        .from(CommandsTable)
        .where(
            and(
                eq(CommandsTable.owner, userId),
                eq(CommandsTable.command, command)
            )
        )
        .execute()

    if (!objWithCommand) throw new Error('Command not found')

    return objWithCommand
}