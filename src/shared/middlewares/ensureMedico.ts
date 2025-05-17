import AppError from "@shared/errors/AppError";
import { Request, Response, NextFunction } from "express";
import { IUsuarioRepository } from "src/modules/usuarios/domain/repositories/IUsuarioRepository";
import { container } from "tsyringe";

export async function ensureMedico(
    request: Request,
    response: Response,
    next: NextFunction
): Promise<void> {
    const usuarioRepository = container.resolve<IUsuarioRepository>('UsuarioRepository');

    const usuario = await usuarioRepository.findById(request.usuario.id);

    if (!usuario) {
        throw new AppError('Usuário não encontrado.', 404);
    }

    if (usuario.tipo !== 'MEDICO') {
        throw new AppError('Acesso restrito a médicos.', 403);
    }

    return next()
}