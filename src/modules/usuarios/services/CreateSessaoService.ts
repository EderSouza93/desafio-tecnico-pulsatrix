import { inject, injectable } from "tsyringe";
import { IUsuarioRepository } from "../domain/repositories/IUsuarioRepository";
import AppError from "@shared/errors/AppError";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { Usuario } from "../infra/database/entities/Usuario";
import "dotenv/config";
import 'reflect-metadata';

interface IRequest {
    email: string;
    senha_hash: string;
}

interface IResponse {
    usuario: Usuario;
    token: string;
}
@injectable()
export default class CreateSessaoService {
    constructor(
        @inject('UsuarioRepository')
        private usuarioRepository: IUsuarioRepository,
    ) { }
    public async execute({ email, senha_hash }: IRequest): Promise<IResponse> {
        const usuario = await this.usuarioRepository.findByEmail(email);

        if (!usuario) {
            throw new AppError("Senha/email como combinação incorreta.", 401);
        }

        const senhaConfirmada = await compare(senha_hash, usuario.senha_hash)

        if (!senhaConfirmada) {
            throw new AppError('Combinação de Email/senha incorreta.', 401)
        }

        const token = sign({}, process.env.APP_SECRET as string, {
            subject: String(usuario.id),
            expiresIn: '8h',
        });

        return {
            usuario,
            token,
        };
    }
}