import { Hono } from "hono"
import { logger } from 'hono/logger'

export const createApp = () => {
    const app = new Hono()
    app.use(logger())

    app.get('/health', (c) => {
        return c.text('OK')
    })

    return app
}