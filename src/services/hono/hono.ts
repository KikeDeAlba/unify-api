import type { Hono } from "hono";
import { createApp } from "./utils/create-app";
import { addRoutes } from "./utils/add-routes";
import { serveApp } from "./utils/serve-app";

interface HonoConfig {
    port?: number;
    routes: Hono[];
}

export const initHono = async ({ port = 3000, routes }: HonoConfig) => {
    const app = createApp()
    addRoutes(app, routes)
    serveApp(app, port)

    console.log(`Server is running on port ${port}`)
};
