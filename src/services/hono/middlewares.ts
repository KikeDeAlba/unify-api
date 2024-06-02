import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

export const hasCookie = <T extends string>(cookie: T) => zValidator(
    'cookie',
    z.object({
        [cookie]: z.string()
    }),
    ({ success }, c) => {
        if (!success) return c.json({ success: false, message: 'Invalid request', error: `${cookie} cookie not found` }, 400);
    }
)
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const jsonValidate = <T extends z.ZodType<any, z.ZodTypeDef, any>>(obj: T) => zValidator('json', obj, ({ success, data }, c) => {
    if (!success) return c.json({ success: false, message: 'Invalid request', error: 'Invalid body', data }, 400);
})