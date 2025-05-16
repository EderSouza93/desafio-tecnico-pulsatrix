import { Router } from "express";
import { MedicoController } from "../controllers/MedicoController";
import { medicoSchema } from "../schemas/MedicoSchema";

const medicoRoutes = Router();
const controller = new MedicoController();

medicoRoutes.post('/', medicoSchema, controller.create);

export default medicoRoutes;