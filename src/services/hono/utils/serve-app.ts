import { serve } from "@hono/node-server";
import type { Hono } from "hono";

export const serveApp = async (app: Hono, port: number) => {
    serve({
        fetch: app.fetch,
        port,
    });
};
