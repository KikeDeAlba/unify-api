import { sql } from "orm/drizzle"

export const listenChannelSQL = async (channel: string) => {
    sql`CALL listen_channel(${channel})`
}