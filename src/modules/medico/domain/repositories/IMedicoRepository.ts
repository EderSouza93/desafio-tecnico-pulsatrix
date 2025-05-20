import { ICreateMedicoDTO } from "../models/ICreateMedicoDTO";
import { IListMedicos } from "../models/IListMedicos";
import { IMedico } from "../models/IMedico";

export interface IMedicoRepository {
    create(data: ICreateMedicoDTO): Promise<IMedico>;
    findById(id: number): Promise<IMedico | null>;
    findAll(bome?: string, especialidade?: string): Promise<IListMedicos>;
}