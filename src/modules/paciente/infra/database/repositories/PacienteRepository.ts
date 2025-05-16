import { IPacienteRepository } from "src/modules/paciente/domain/repositories/IPacienteRepository";
import { Repository } from "typeorm";
import { Paciente } from "../entities/Paciente";
import { AppDataSource } from "@shared/typeorm/data-source";
import { ICreatePacienteDTO } from "src/modules/paciente/domain/models/ICreatePacienteDTO";
import { IPaciente } from "src/modules/paciente/domain/models/IPaciente";

export class PacienteRepository implements IPacienteRepository {
    private ormRepository: Repository<Paciente>;

    constructor() {
        this.ormRepository = AppDataSource.getRepository(Paciente);
    }

    public async create(data: ICreatePacienteDTO): Promise<IPaciente> {
        const paciente = this.ormRepository.create(data);
        await this.ormRepository.save(paciente);
        return paciente;
    }

    public async findById(id: number): Promise<IPaciente | null> {
        return this.ormRepository.findOneBy({ id });
    }
}