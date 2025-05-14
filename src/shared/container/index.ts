import { container } from "tsyringe";

import { IUsuarioRepository } from "src/modules/usuarios/domain/repositories/IUsuarioRepository";
import { UsuarioRepository } from "src/modules/usuarios/infra/database/repositories/UsuarioRepository";

container.registerSingleton<IUsuarioRepository>(
  "UsuarioRepository",
  UsuarioRepository
);
