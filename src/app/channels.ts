import { listenChannel } from "@/core/channels/listen";
import { createApp } from "@/services/hono/utils/create-app";
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod';

export const channels = createApp().basePath('/channels');

channels.post(
    '/',
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

        await listenChannel(channel);

        return c.json({ success: true, message: 'Channel successfully added' }, 200);
    }
)