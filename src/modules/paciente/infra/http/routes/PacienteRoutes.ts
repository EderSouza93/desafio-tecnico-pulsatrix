import { Router } from "express";
import { PacienteController } from "../controllers/PacienteController";
import { PacienteSchema } from "../schemas/PacienteSchema";

const pacienteRoutes = Router();
const controller = new PacienteController();

pacienteRoutes.post('/', PacienteSchema, controller.create)

export default pacienteRoutes;