import { getChannels } from "@/core/channels/get";
import { listenChannel } from "@/core/channels/listen";
import { createApp } from "@/services/hono/utils/create-app";
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod';

export const channels = createApp().basePath('/channels');

channels.post(
    '/add',
    zValidator(
        'query',
        z.object({
            channel: z.string()
        }),
        ({ success }, c) => {
            if (!success) return c.json({ success: false, message: 'Invalid request' }, 400);
        }
    ),
    async (c) => {
        const { channel } = c.req.query()

        try {
            await listenChannel(channel);
        } catch (error) {
            console.error(error)

            return c.json({ success: false, message: 'Internal Server Error' }, 500);
        }

        return c.json({ success: true, message: 'Channel successfully added' }, 200);
    }
)

channels.get('/', async (c) => {
    const channels = await getChannels()

    return c.json(channels, 200)
})