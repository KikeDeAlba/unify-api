import { Hono } from "hono"
import { logger } from 'hono/logger'

export const createApp = (basePath = '/') => {
    const app = new Hono().basePath(basePath)
    app.use(logger())

    app.get('/health', (c) => {
        return c.text('OK')
    })

    return app
}