import { Request, Response } from "express";
import { instanceToInstance } from "class-transformer";
import CreateSessaoService from "src/modules/usuarios/services/CreateSessaoService";
import { container } from "tsyringe";

export default class SessaoController {
    async create(request: Request, response: Response): Promise<void> {
        const { email, senha_hash } = request.body;

        const createSessao = container.resolve(CreateSessaoService);

        const usuario = await createSessao.execute({
            email,
            senha_hash,
        });

        response.json(instanceToInstance(usuario))
    }
}