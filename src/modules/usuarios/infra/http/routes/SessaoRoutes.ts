import { Router } from "express";
import SessaoController from "../controllers/SessaoController";
import { sessaoSchema } from "../schemas/SessaoSchema";

const sessaoRouter = Router();
const sessaoController = new SessaoController();

sessaoRouter.post('/', sessaoSchema, sessaoController.create);

export default sessaoRouter