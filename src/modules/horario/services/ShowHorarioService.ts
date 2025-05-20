import { inject, injectable } from "tsyringe";
import { IHorarioRepository } from "../domain/repositories/IHorarioRepository";
import { HorarioDisponivel } from "../infra/database/entities/Horario";
import AppError from "@shared/errors/AppError";


interface IRequest {
    id: number;
}

@injectable()
export default class ShowHorarioService {
    constructor(
        @inject('HorarioRepository')
        private horarioRepository: IHorarioRepository,
    ) { }
    
    public async execute({ id }: IRequest): Promise<HorarioDisponivel> {
        const horario = await this.horarioRepository.findById(id);
        if (!horario) {
            throw new AppError('Horário não encontrado.', 404);
        }
        if (!('medico' in horario)) {
            throw new AppError('Horário não possui o campo médico.', 500);
        }
        return horario as HorarioDisponivel;
    }
}