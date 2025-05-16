import { container } from "tsyringe";

import { IUsuarioRepository } from "src/modules/usuarios/domain/repositories/IUsuarioRepository";
import { UsuarioRepository } from "src/modules/usuarios/infra/database/repositories/UsuarioRepository";
import { IMedicoRepository } from "src/modules/medico/domain/repositories/IMedicoRepository";
import { MedicoRepository } from "src/modules/medico/infra/database/repositories/MedicoRepository";
import { IPacienteRepository } from "src/modules/paciente/domain/repositories/IPacienteRepository";
import { PacienteRepository } from "src/modules/paciente/infra/database/repositories/PacienteRepository";

container.registerSingleton<IUsuarioRepository>(
  "UsuarioRepository",
  UsuarioRepository
);

container.registerSingleton<IMedicoRepository>(
  "MedicoRepository",
  MedicoRepository
)

container.registerSingleton<IPacienteRepository>(
  "PacienteRepository",
  PacienteRepository
)