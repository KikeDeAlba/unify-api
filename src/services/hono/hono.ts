import type { Hono } from "hono";
import { createApp } from "./utils/create-app";
import { addRoutes } from "./utils/add-routes";
import { serveApp } from "./utils/serve-app";

interface HonoConfig {
    port?: number;
    routes: Hono[];
}

export const initHono = async ({ routes }: HonoConfig) => {
    const app = createApp();
    const honoRoutes = addRoutes(app, routes);
    serveApp(honoRoutes, Number(process.env.PORT));

    console.log(`Server is running on port ${Number(process.env.PORT)}`);
};
