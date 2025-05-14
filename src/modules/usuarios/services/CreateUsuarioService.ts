import { inject, injectable } from "tsyringe";
import { hash } from "bcrypt";

import { IUsuarioRepository } from "../domain/repositories/IUsuarioRepository";
import { Usuario } from "../infra/database/entities/Usuario";
import AppError from "@shared/errors/AppError";
import { ICreateUsuarioDTO } from "../domain/models/ICreateUsuarioDTO";


@injectable()
export default class CreateUsuarioService {
    constructor(
        @inject('UsuarioRepository')
        private usuarioRepository: IUsuarioRepository,
    ) { }
    public async execute({ nome, email, senha_hash, tipo }: ICreateUsuarioDTO): Promise<Usuario> {
        const emailExists = await this.usuarioRepository.findByEmail(email);

        if (emailExists) {
            throw new AppError('Email já existe.', 409);
        }

        console.log(senha_hash)
        const hashedPassword = await hash(senha_hash, 8)

        const usuario = await this.usuarioRepository.create({
            nome,
            email,
            senha_hash: hashedPassword,
            tipo
        });

        return usuario
    }
}
