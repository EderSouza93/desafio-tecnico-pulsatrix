import { Router } from "express";
import usuarioRouter from "src/modules/usuarios/infra/http/routes/UsuarioRoutes";

const routes = Router()

routes.get("/health", (request, response) => {
  response.json({ message: "Hello Dev! I'm Alive! " });
});
routes.use('/usuarios', usuarioRouter)

export default routes;