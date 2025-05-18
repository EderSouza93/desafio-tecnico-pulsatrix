import { IMedicoRepository } from "src/modules/medico/domain/repositories/IMedicoRepository";
import { inject, injectable } from "tsyringe";
import { IHorarioRepository } from "../domain/repositories/IHorarioRepository";
import { ICreateHorarioDTO } from "../domain/models/ICreateHorarioDTO";
import AppError from "@shared/errors/AppError";



@injectable()
export class CreateHorarioService {
    constructor(
        @inject('MedicoRepository')
        private medicoRepository: IMedicoRepository,

        @inject('HorarioRepository')
        private horarioRepository: IHorarioRepository,

    ) { }
    
    public async execute({
        medico_id,
        data,
        hora_inicio,
        hora_fim,
    }: ICreateHorarioDTO) {
        const medico = await this.medicoRepository.findById(medico_id);

        if (!medico) {
            throw new AppError('Médico não cadastrado.', 404);
        }
        
        if (typeof data !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(data)) {
          throw new AppError("Data em formato inválido.");
        }


        const conflito = await this.horarioRepository.findByHorario(
            medico_id,
            data,
            hora_inicio,
            hora_fim
        );

        if (conflito) {
            throw new AppError('Já existe um horário cadastrado neste intervalo.', 409)
        }

        return this.horarioRepository.create({
            medico_id,
            data,
            hora_inicio,
            hora_fim,
        });
    }
}