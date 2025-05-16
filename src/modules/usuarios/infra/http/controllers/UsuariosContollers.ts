import { container } from "tsyringe";
import { Request, Response } from "express";
import CreateUsuarioService from "src/modules/usuarios/services/CreateUsuarioService";

export default class UsuariosControllers {
    async create(request: Request, response: Response): Promise<void> {
        const { nome, email, senha_hash, tipo } = request.body;

        const service = container.resolve(CreateUsuarioService);

        const usuario = await service.execute({ nome, email, senha_hash, tipo });

        response.status(201).json(usuario)
    }
}