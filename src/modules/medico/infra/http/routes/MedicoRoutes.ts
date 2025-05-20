import { Router } from "express";
import { MedicoController } from "../controllers/MedicoController";
import { medicoSchema } from "../schemas/MedicoSchema";
import AuthMiddleware from "@shared/middlewares/authMiddleware";

const medicoRoutes = Router();
const controller = new MedicoController();

medicoRoutes.post('/', medicoSchema, controller.create);
medicoRoutes.use(AuthMiddleware.execute);
medicoRoutes.get('/', controller.index);

export default medicoRoutes;