import { bot } from "@/core/init";
import { hasCookie } from "@/services/hono/middlewares/bearer-token";
import { createApp } from "@/services/hono/utils/create-app";
import { validateToken } from "@/services/twicth/utils";
import { getCookie } from "hono/cookie";
import { sql } from "schema/orm/db";

export const channelsRouter = createApp('/channels')

channelsRouter.get('/add', hasCookie('twitch-auth'), async (c) => {
    const twitchAuth = getCookie(c, 'twitch-auth')
    if (!twitchAuth) return c.text('Invalid request', 400);

    console.log(twitchAuth)

    const validateInfo = await validateToken(twitchAuth)

    console.log(validateInfo)

    bot.addChannel(validateInfo.login)

    try {
        await sql`SELECT listen_channel(${validateInfo.user_id}, ${validateInfo.login})`
    } catch (error) {
        console.error(error)
        return c.text('Error', 500)
    }
    return c.json({ success: true })
})