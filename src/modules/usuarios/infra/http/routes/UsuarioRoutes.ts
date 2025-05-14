import { Router } from "express";
import UsuariosControllers from "../controllers/UsuariosContollers";
import { createUsuarioSchema } from "../schemas/UsuarioSchema";

const usuarioRouter = Router();
const usuariosContoller = new UsuariosControllers();

usuarioRouter.post('/', createUsuarioSchema, usuariosContoller.create);

export default usuarioRouter;