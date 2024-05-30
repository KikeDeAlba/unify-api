import { ROUTES } from "./app/routes";
import { initHono } from "./services/hono/hono";

initHono({
  routes: ROUTES
})
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });