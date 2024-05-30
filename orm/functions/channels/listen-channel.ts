import { sql } from "orm/drizzle"

export const listenChannelSQL = async (channel: string, accessToken: string) => {
    await sql`SELECT listen_channel(${channel}, ${accessToken})`
}