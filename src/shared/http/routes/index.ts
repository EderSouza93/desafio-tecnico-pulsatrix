import { Router } from "express";

const routes = Router()

routes.get("/health", (request, response) => {
  response.json({ message: "Hello Dev! I'm Alive! " });
});

export default routes;