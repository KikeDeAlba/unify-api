import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

export const hasCookie = (cookie = 'twitch-auth') => zValidator(
    'cookie',
    z.object({
        [cookie]: z.string()
    }),
    ({ success }, c) => {
        if (!success) return c.json({ success: false, message: 'Invalid request', error: `${cookie} cookie not found` }, 400);
    }
)