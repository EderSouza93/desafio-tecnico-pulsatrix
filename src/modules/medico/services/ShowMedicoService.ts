import { inject, injectable } from "tsyringe";
import { IMedicoRepository } from "../domain/repositories/IMedicoRepository";
import { Medico } from "../infra/database/entities/Medico";
import AppError from "@shared/errors/AppError";

interface IRequest { id: string }

@injectable()
export default class ShowMedicoService {
    constructor(
        @inject('MedicoRepository')
        private medicoRepository: IMedicoRepository,
    ) { }
    
    public async execute({ id }: IRequest): Promise<Medico> {
        const medico = await this.medicoRepository.findById(Number(id));
        if (!medico) throw new AppError('Médico não encontrado.', 404);

        if (!('usuario' in medico)) {
            throw new AppError('Médico não possui usuário associado.', 500);
        }
        return medico as Medico;
    }
}