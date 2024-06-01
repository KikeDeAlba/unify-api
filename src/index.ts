import { ROUTES } from "./app/routes";
import { initUnify } from "./core/init";
import { initHono } from "./services/hono/hono";

initUnify()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });

initHono({
  routes: ROUTES
})
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
