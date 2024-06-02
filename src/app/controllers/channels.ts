import { bot } from "@/core/init";
import { hasCookie, jsonValidate } from "@/services/hono/middlewares";
import { createApp } from "@/services/hono/utils/create-app";
import { detectBadCommandCode } from "@/services/ollama/ollama.controller";
import { addCommand, removeCommand } from "@/services/postgresql/channels";
import { validateToken } from "@/services/twicth/utils";
import { getCookie } from "hono/cookie";
import { sql } from "schema/orm/db";
import { z } from "zod";

export const channelsRouter = createApp('/channels')

channelsRouter.get('/join', hasCookie('twitch-auth'), async (c) => {
    const twitchAuth = getCookie(c, 'twitch-auth')
    if (!twitchAuth) return c.text('Invalid request', 400);


    const validateInfo = await validateToken(twitchAuth)

    bot.addChannel(validateInfo.login)

    try {
        await sql`SELECT listen_channel(${validateInfo.user_id}, ${validateInfo.login})`
    } catch (error) {
        console.error(error)
        return c.text('Error', 500)
    }
    return c.json({ success: true })
})

channelsRouter.get('/part', hasCookie('twitch-auth'), async (c) => {
    const twitchAuth = getCookie(c, 'twitch-auth')
    if (!twitchAuth) return c.text('Invalid request', 400);

    const validateInfo = await validateToken(twitchAuth)

    bot.removeChannel(validateInfo.login)

    try {
        await sql`SELECT unlisten_channel(${validateInfo.login})`
    } catch (error) {
        console.error(error)
        return c.text('Error', 500)
    }
    return c.json({ success: true })
})

channelsRouter.get('/listening/:channel', async (c) => {
    const { channel } = c.req.param()

    const isListening = await bot.isListening(channel)

    return c.json({ success: true, data: isListening })
})

channelsRouter.post('/command', hasCookie('twitch-auth'), jsonValidate(z.object({
    command: z.string(),
    description: z.string(),
    code: z.string()
})), async (c) => {
    const twitchAuth = getCookie(c, 'twitch-auth') as string

    const { code, command, description } = await c.req.json<{
        command: string;
        description: string;
        code: string;
    }>()

    // const isBadCode = await detectBadCommandCode(code)

    // if (isBadCode === 'bad') return c.text('Bad code', 400)

    const validateInfo = await validateToken(twitchAuth)

    try {
        const data = await addCommand(command, description, code, validateInfo.user_id)

        return c.json({ success: true, data })
    } catch (error) {
        console.error(error)
        return c.text('Error', 500)
    }
})

channelsRouter.delete('/command/:command', hasCookie('twitch-auth'), async (c) => {
    const twitchAuth = getCookie(c, 'twitch-auth') as string

    const { command } = c.req.param()

    const validateInfo = await validateToken(twitchAuth)

    try {
        await removeCommand(command, validateInfo.user_id)

        return c.json({ success: true })
    } catch (error) {
        console.error(error)
        return c.text('Error', 500)
    }
})