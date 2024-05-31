import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

export const bearerToken = () => zValidator(
    'header',
    z.object({
        authorization: z.string()
    }),
    ({ success, data }, c) => {
        console.log(success, data)

        if (!success) return c.json({ success: false, message: 'Invalid request' }, 400);
    }
)