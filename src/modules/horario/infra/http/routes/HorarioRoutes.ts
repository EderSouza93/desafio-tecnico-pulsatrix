import { Router } from "express";
import { HorarioController } from "../controllers/HorarioControllers";
import { horarioSchema } from "../schemas/HorarioSchema";
import AuthMiddleware from "@shared/middlewares/authMiddleware";
import { ensureMedico } from "@shared/middlewares/ensureMedico";

const horarioRoutes = Router();
const controller = new HorarioController();

horarioRoutes.use(AuthMiddleware.execute);
horarioRoutes.post('/', ensureMedico, horarioSchema, controller.create);
horarioRoutes.delete('/:id', ensureMedico, controller.delete);
horarioRoutes.get('/', controller.index);
horarioRoutes.get('/:id', controller.show)

export default horarioRoutes;