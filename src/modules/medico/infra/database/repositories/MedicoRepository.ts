import { IMedicoRepository } from "src/modules/medico/domain/repositories/IMedicoRepository";
import { Repository } from "typeorm";
import { Medico } from "../entities/Medico";
import { AppDataSource } from "@shared/typeorm/data-source";
import { ICreateMedicoDTO } from "src/modules/medico/domain/models/ICreateMedicoDTO";
import { IMedico } from "src/modules/medico/domain/models/IMedico";
import { IListMedicos } from "src/modules/medico/domain/models/IListMedicos";

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

    public async findAll(nome?: string, especialidade?: string): Promise<IListMedicos> {
        const query = await this.ormRepository
            .createQueryBuilder('medico')
            .leftJoinAndSelect('medico.usuario', 'usuario')
            .select([
                'medico.id',
                'usuario.nome',
                'usuario.email',
                'medico.especialidade',
                'medico.crm',
            ]);

        if (nome) {
            query.andWhere('usuario.nome ILIKE :nome', { nome: `%${nome}%` });
        }
        if (especialidade) {
            query.andWhere('medico.especialidade ILIKE :especialidade', { especialidade: `%${especialidade}%` });
        }

        const rawMedico = await query.getRawOne();
        if (!rawMedico) {
            throw new Error('Medico não encontrado.');
        }
        const medico: IListMedicos = {
            id: rawMedico.medico_id,
            nome: rawMedico.usuario_nome,
            email: rawMedico.usuario_email,
            especialidade: rawMedico.medico_especialidade,
            crm: rawMedico.medico_crm,
        };
        return medico;
    }
}