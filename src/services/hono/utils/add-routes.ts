import type { Hono } from "hono";

export const addRoutes = (app: Hono, routes: Hono[]) => {
    for (const route of routes) {
        app.route('/', route);
    }

    return app;
};
