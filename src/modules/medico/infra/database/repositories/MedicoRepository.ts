import { IMedicoRepository } from "src/modules/medico/domain/repositories/IMedicoRepository";
import { Repository } from "typeorm";
import { Medico } from "../entities/Medico";
import { AppDataSource } from "@shared/typeorm/data-source";
import { ICreateMedicoDTO } from "src/modules/medico/domain/models/ICreateMedicoDTO";
import { IMedico } from "src/modules/medico/domain/models/IMedico";

export class MedicoRepository implements IMedicoRepository {
    private ormRepository: Repository<Medico>;

    constructor() {
        this.ormRepository = AppDataSource.getRepository(Medico);
    }

    public async create(data: ICreateMedicoDTO): Promise<IMedico> {
        const medico = this.ormRepository.create(data);
        await this.ormRepository.save(medico);
        return medico;
    }

    public async findById(id: number): Promise<IMedico | null> {
        return this.ormRepository.findOneBy({ id });
    }
}