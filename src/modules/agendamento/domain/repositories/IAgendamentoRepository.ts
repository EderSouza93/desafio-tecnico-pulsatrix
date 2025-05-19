import { IAgendamento } from "../models/IAgendamento";
import { ICreateAgendamentoDTO } from "../models/ICreateAgendamentoDTO";

export interface IAgendamentoRepository {
    create(data: ICreateAgendamentoDTO): Promise<IAgendamento>;
    findById(id: number): Promise<IAgendamento | null>;
    findByHorario(
        medico_id: number,
        data: string,
        hora_inicio: string,
        hora_fim: string
    ): Promise<IAgendamento | null>;
    findByPaciente(paciente_id: number): Promise<IAgendamento[]>;
    updateStatus(id: number, status: 'AGENDADO' | 'CANCELADO' | 'REALIZADO'): Promise<void>;
}