import { IHorarioRepository } from "src/modules/horario/domain/repositories/IHorarioRepository";
import { Repository } from "typeorm";
import { HorarioDisponivel } from "../entities/Horario";
import { AppDataSource } from "@shared/typeorm/data-source";
import { ICreateHorarioDTO } from "src/modules/horario/domain/models/ICreateHorarioDTO";
import { IHorario } from "src/modules/horario/domain/models/IHorario";

export class HorarioRepository implements IHorarioRepository {
    private ormRepository: Repository<HorarioDisponivel>;

    constructor() {
        this.ormRepository = AppDataSource.getRepository(HorarioDisponivel)
    }

    public async create(data: ICreateHorarioDTO): Promise<IHorario> {
        const horarioDisponivel = this.ormRepository.create(data);
        await this.ormRepository.save(horarioDisponivel);
        return horarioDisponivel;
    }

    public async findByHorario(medico_id: number, data: string, hora_inicio: string, hora_fim: string): Promise<IHorario | null> {
        return this.ormRepository
            .createQueryBuilder('horario')
            .where('horario.medico_id = :medico_id', { medico_id })
            .andWhere('horario.data = :data', { data })
            .andWhere('horario.hora_inicio < :hora_fim AND horario.hora_fim > :hora_inicio', { hora_inicio, hora_fim })
            .getOne();
    }

    public async findAll(): Promise<IHorario[]> {
        return this.ormRepository.find({
            order: { data: 'ASC', hora_inicio: 'ASC' },
        });
    }

    public async findByMedico(medico_id: number, data?: string): Promise<IHorario[]> {
        const query = this.ormRepository.createQueryBuilder('horario')
            .where('horario.medico_id = :medico_id', { medico_id });
        
        if (data) {
            query.andWhere('horario.data = :data', { data });
        }

        return query.orderBy('horario.hora_inicio', 'ASC').getMany()
    }

    public async findById(id: number): Promise<IHorario | null> {
        const horario = await this.ormRepository.findOne({
            where: { id },
            relations: ['medico'],
        });
        return horario ?? null;
    }

    public async deleteById(id: number, medico_id: number): Promise<void> {
        await this.ormRepository.delete({ id, medico_id });
    }
}