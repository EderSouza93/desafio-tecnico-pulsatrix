import { IAgendamentoRepository } from "src/modules/agendamento/domain/repositories/IAgendamentoRepository";
import { Repository } from "typeorm";
import { Agendamento } from "../entities/Agendamento";
import { AppDataSource } from "@shared/typeorm/data-source";
import { IAgendamento } from "src/modules/agendamento/domain/models/IAgendamento";
import { ICreateAgendamentoDTO } from "src/modules/agendamento/domain/models/ICreateAgendamentoDTO";

export class AgendamentoRepository implements IAgendamentoRepository {
  private ormRepository: Repository<Agendamento>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Agendamento);
  }

  public async create(data: ICreateAgendamentoDTO): Promise<IAgendamento> {
    const agendamento = this.ormRepository.create({
      ...data,
      status: "AGENDADO",
    });

    await this.ormRepository.save(agendamento);
    return agendamento;
  }

  public async findById(id: number): Promise<IAgendamento | null> {
    return this.ormRepository.findOne({ where: { id } });
  }

  public async findByHorario(
    medico_id: number,
    data: string,
    hora_inicio: string,
    hora_fim: string
  ): Promise<IAgendamento | null> {
    return this.ormRepository
      .createQueryBuilder("agendamento")
      .where("agendamento.medico_id = :medico_id", { medico_id })
      .andWhere("agendamento.data = :data", { data })
      .andWhere(
        "agendamento.hora_inicio < :hora_fim AND agendamento.hora_fim > :hora_inicio",
        {
          hora_inicio,
          hora_fim,
        }
      )
      .andWhere("agendamento.status = :status", { status: "AGENDADO" })
      .getOne();
  }

  public async findByPaciente(paciente_id: number): Promise<IAgendamento[]> {
    return this.ormRepository.find({
      where: { paciente_id },
      order: { data: "ASC", hora_inicio: "ASC" },
    });
  }

  public async updateStatus(
    id: number,
    status: "AGENDADO" | "CANCELADO" | "REALIZADO"
  ): Promise<void> {
      await this.ormRepository.update(id, { status });
  }
}