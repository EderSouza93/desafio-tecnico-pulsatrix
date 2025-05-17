import { inject, injectable } from "tsyringe";
import { IHorarioRepository } from "../domain/repositories/IHorarioRepository";
import { HorarioDisponivel } from "../infra/database/entities/Horario";

@injectable()
export class ListHorariosDisponiveisService {
    constructor(
        @inject('HorarioRepository')
        private horarioRepository: IHorarioRepository
    ) { }
    
    public async execute(medico_id?: number, data?: string): Promise<HorarioDisponivel[]>{
        if (medico_id) {
            const horarios = await this.horarioRepository.findByMedico(medico_id, data);
            return horarios.map(horario => ({
                ...horario,
                medico: (horario as any).medico 
            })) as HorarioDisponivel[];
        }

        const horarios = await this.horarioRepository.findAll();
        return horarios.map(horario => ({
            ...horario,
            medico: (horario as any).medico 
        })) as HorarioDisponivel[];
    }
}