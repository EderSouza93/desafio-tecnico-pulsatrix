import { ICreateUsuarioDTO } from "../models/ICreateUsuarioDTO";
import { IUsuario } from "../models/IUsuario";

export interface IUsuarioRepository {
    create(data: ICreateUsuarioDTO): Promise<IUsuario>;
    findById(id: number): Promise<IUsuario | null>;
    findByEmail(email: string): Promise<IUsuario | null>;
}