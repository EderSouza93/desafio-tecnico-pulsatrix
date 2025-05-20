import { inject, injectable } from "tsyringe";
import { IAgendamentoRepository } from "../domain/repositories/IAgendamentoRepository";
import AppError from "@shared/errors/AppError";
import { IUsuarioRepository } from "src/modules/usuarios/domain/repositories/IUsuarioRepository";

interface IRequest {
    agendamento_id: number;
    usuario_id: number;
    status: 'CANCELADO' | 'REALIZADO';
}

@injectable()
export class UpdateStatusAgendamentoService {
    constructor(
        @inject('AgendamentoRepository')
        private agendamentoRepository: IAgendamentoRepository,

        @inject('UsuarioRepository')
        private usuarioRepository: IUsuarioRepository,
    ) { }
    
    public async execute({ agendamento_id, usuario_id, status}: IRequest): Promise<void> {
        const agendamento = await this.agendamentoRepository.findById(agendamento_id);

        if (!agendamento) {
            throw new AppError('Agendamento não encontrado.', 404);
        }

        const usuario = await this.usuarioRepository.findById(usuario_id);
        if (!usuario) {
            throw new AppError('Usuário não encontrado.', 404);
        }

        if (status === 'CANCELADO') {
            if (usuario.tipo !== 'PACIENTE' || usuario.id !== agendamento.paciente_id) {
                throw new AppError('Apenas o paciente pode cancelar este agendandamento.', 403);
            }
        }

        if (status === 'REALIZADO') {
            if (usuario.tipo !== 'MEDICO' || usuario.id !== agendamento.medico_id) {
                throw new AppError('Apenas o médico responsável pode finalizar este agendamento.', 403);
            }
        }

        if (agendamento.status !== 'AGENDADO') {
            throw new AppError('Este agendamento já foi finalizado ou cancelado.', 400)
        }

        await this.agendamentoRepository.updateStatus(agendamento_id, status);
    }
}