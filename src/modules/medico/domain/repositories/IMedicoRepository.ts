import { ICreateMedicoDTO } from "../models/ICreateMedicoDTO";
import { IMedico } from "../models/IMedico";

export interface IMedicoRepository {
    create(data: ICreateMedicoDTO): Promise<IMedico>;
    findById(id: number):Promise<IMedico | null>
}