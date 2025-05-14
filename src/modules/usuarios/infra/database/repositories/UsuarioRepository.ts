import { IUsuarioRepository } from "src/modules/usuarios/domain/repositories/IUsuarioRepository";
import { Repository } from "typeorm";
import { Usuario } from "../entities/Usuario";
import { AppDataSource } from "@shared/typeorm/data-source";
import { ICreateUsuarioDTO } from "src/modules/usuarios/domain/models/ICreateUsuarioDTO";
import { IUsuario } from "src/modules/usuarios/domain/models/IUsuario";

export class UsuarioRepository implements IUsuarioRepository {
    private ormRepository: Repository<Usuario>;

    constructor() {
        this.ormRepository = AppDataSource.getRepository(Usuario);
    }

    public async create(data: ICreateUsuarioDTO): Promise<IUsuario> {
        const usuario = this.ormRepository.create(data);
        await this.ormRepository.save(usuario);
        return usuario;
    }

    public async findById(id: number): Promise<IUsuario | null> {
        return this.ormRepository.findOneBy({ id });
    }

    public async findByEmail(email: string): Promise<IUsuario | null> {
        return this.ormRepository.findOneBy({ email })
    }
}