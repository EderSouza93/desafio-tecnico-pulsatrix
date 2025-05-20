import { inject, injectable } from "tsyringe";
import { IAgendamentoRepository } from "../domain/repositories/IAgendamentoRepository";
import { IAgendamento } from "../domain/models/IAgendamento";

@injectable()
export class ListAgendamentosService {
    constructor(
        @inject('AgendamentoRepository')
        private agendamentoRepository: IAgendamentoRepository
    ) { }
    
    public async execute(paciente_id: number): Promise<IAgendamento[]> {
        const agendamentos = await this.agendamentoRepository.findByPaciente(paciente_id);
        return agendamentos;
    }
}