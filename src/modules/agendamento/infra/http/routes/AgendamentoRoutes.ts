import { Router } from "express";
import { AgendamentoController } from "../controllers/AgendamentoController";
import AuthMiddleware from "@shared/middlewares/authMiddleware";
import { createAgendamentoSchema } from "../schemas/createAgendamentoSchema";
import { updateStatusSchema } from "../schemas/updateStatusSchema";

const agendamentoRoutes = Router();
const controller = new AgendamentoController();

agendamentoRoutes.use(AuthMiddleware.execute);

agendamentoRoutes.get("/", controller.list);
agendamentoRoutes.post('/', createAgendamentoSchema, controller.create);
agendamentoRoutes.patch('/:id/status', updateStatusSchema, controller.updateStatus);

export default agendamentoRoutes;