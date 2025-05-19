import { IHorarioRepository } from "src/modules/horario/domain/repositories/IHorarioRepository";
import { IUsuarioRepository } from "src/modules/usuarios/domain/repositories/IUsuarioRepository";
import { inject, injectable } from "tsyringe";
import { IAgendamentoRepository } from "../domain/repositories/IAgendamentoRepository";
import { ICreateAgendamentoDTO } from "../domain/models/ICreateAgendamentoDTO";
import AppError from "@shared/errors/AppError";
import { differenceInMinutes, isValid, parse } from "date-fns";

@injectable()
export class CreateAgendamentoService {
    constructor(
        @inject('UsuarioRepository')
        private usuarioRepository: IUsuarioRepository,

        @inject('HorarioRepository')
        private horarioRepository: IHorarioRepository,

        @inject('AgendamentoRepository')
        private agendamentoRepository: IAgendamentoRepository
    ) { }
    
    public async execute({
        paciente_id,
        medico_id,
        data,
        hora_inicio,
        hora_fim,
    }: ICreateAgendamentoDTO) {
        const usuario = await this.usuarioRepository.findById(paciente_id);

        if (!usuario || usuario.tipo !== 'PACIENTE') {
            throw new AppError('Apenas pacientes podem realizar agendamentos.', 403);
        }

        const horarioDisponivel = await this.horarioRepository.findByHorario(
            medico_id,
            data,
            hora_inicio,
            hora_fim
        );

        if (!horarioDisponivel) {
            throw new AppError('Este horário não está disponível para agendamentos.', 404);
        }

        const conflito = await this.agendamentoRepository.findByHorario(
            medico_id,
            data,
            hora_inicio,
            hora_fim
        );

        if (conflito) {
            throw new AppError('Já existe uma agendamento neste horário.', 409);
        }

        const inicio = parse(hora_inicio, "HH:mm:ss", new Date());
        const fim = parse(hora_fim, "HH:mm:ss", new Date());

        if (!isValid(inicio) || !isValid(fim)) {
            throw new AppError('Hora inválida.', 400);
        }

        const diff = differenceInMinutes(fim, inicio);

        if (diff !== 30) {
            throw new AppError('O agendamento deve ter exatamente 30 minutos.', 400);
        }

        return this.agendamentoRepository.create({
            paciente_id,
            medico_id,
            data,
            hora_inicio,
            hora_fim,
            horario_disponivel_id: horarioDisponivel.id,
        })
    }
}