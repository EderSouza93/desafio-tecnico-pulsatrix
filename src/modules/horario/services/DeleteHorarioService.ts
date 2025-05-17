import { inject, injectable } from "tsyringe";
import { IHorarioRepository } from "../domain/repositories/IHorarioRepository";
import AppError from "@shared/errors/AppError";

@injectable()
export class DeleteHorarioService {
    constructor(
        @inject('HorarioRepository')
        private horarioRepository: IHorarioRepository,
    ) { }
    
    public async execute(id: number, medico_id: number): Promise<void> {
        const horario = await this.horarioRepository.findById(id);

        if (!horario) {
            throw new AppError('Horário não encontrado.', 404);
        }

        if (horario.medico_id !== medico_id) {
            throw new AppError('Você não tem permissão para excluir este horário.', 403);
        }

        await this.horarioRepository.deleteById(id, medico_id);
    }
}