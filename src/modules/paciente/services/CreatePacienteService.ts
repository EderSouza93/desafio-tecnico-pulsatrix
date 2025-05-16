import { inject, injectable } from "tsyringe";
import { IPacienteRepository } from "../domain/repositories/IPacienteRepository";
import { ICreatePacienteDTO } from "../domain/models/ICreatePacienteDTO";
import { IUsuarioRepository } from "src/modules/usuarios/domain/repositories/IUsuarioRepository";
import AppError from "@shared/errors/AppError";

@injectable()
export class CreatePacienteService {
    constructor(
        @inject('PacienteRepository')
        private pacienteRepository: IPacienteRepository,

        @inject('UsuarioRepository')
        private usuarioRepository: IUsuarioRepository
    ) { }
    
    public async execute({ id, telefone, data_nascimento }: ICreatePacienteDTO) {
        const usuario = await this.usuarioRepository.findById(id);

        if (!usuario) {
            throw new AppError('Usuário não encontrado.', 404);
        }

        if (usuario.tipo !== 'PACIENTE') {
            throw new AppError('Este usuário não possui perfil de paciente.', 403);
        }

        const pacienteExistente = await this.pacienteRepository.findById(id);

        if (pacienteExistente) {
            throw new AppError('Paciente já cadastrado.', 400);
        }

        return this.pacienteRepository.create({ id, telefone, data_nascimento });
    }
}