import { Router } from "express";
import horarioRoutes from "src/modules/horario/infra/http/routes/HorarioRoutes";
import medicoRoutes from "src/modules/medico/infra/http/routes/MedicoRoutes";
import pacienteRoutes from "src/modules/paciente/infra/http/routes/PacienteRoutes";
import sessaoRouter from "src/modules/usuarios/infra/http/routes/SessaoRoutes";
import usuarioRouter from "src/modules/usuarios/infra/http/routes/UsuarioRoutes";

const routes = Router()

routes.get("/health", (request, response) => {
  response.json({ message: "Hello Dev! I'm Alive! " });
});
routes.use('/usuarios', usuarioRouter);
routes.use('/sessoes', sessaoRouter);
routes.use('/medicos', medicoRoutes);
routes.use('/pacientes', pacienteRoutes);
routes.use('/horarios', horarioRoutes);

export default routes;