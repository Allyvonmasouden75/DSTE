import { Elysia } from "elysia";
import { regPlugin } from "./plugin/registration";
import { loginPlugin } from "./plugin/login";

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .use(regPlugin)
  .use(loginPlugin)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
