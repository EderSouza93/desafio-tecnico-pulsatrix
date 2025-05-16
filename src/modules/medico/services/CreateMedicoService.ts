import { inject, injectable } from "tsyringe";
import { IMedicoRepository } from "../domain/repositories/IMedicoRepository";
import { ICreateMedicoDTO } from "../domain/models/ICreateMedicoDTO";
import AppError from "@shared/errors/AppError";
import { IUsuarioRepository } from "src/modules/usuarios/domain/repositories/IUsuarioRepository";

@injectable()
export class CreateMedicoService {
    constructor(
        @inject('MedicoRepository')
        private medicoRepository: IMedicoRepository,

        @inject('UsuarioRepository')
        private usuarioRepository: IUsuarioRepository
    ) { }
    
    public async execute({id, especialidade, crm }: ICreateMedicoDTO) {
        const usuario = await this.usuarioRepository.findById(id);

        if (!usuario) {
            throw new AppError('Usuário não encontrado.', 404);
        }

        if (usuario.tipo !== 'MEDICO') {
            throw new AppError('Este usuário não possui perfil de médico.', 403);
        }

        const medicoExistente = await this.medicoRepository.findById(id);

        if (medicoExistente) {
            throw new AppError('Médico já cadastrado.', 400);
        }

        return this.medicoRepository.create({ id, especialidade, crm });
    }
}