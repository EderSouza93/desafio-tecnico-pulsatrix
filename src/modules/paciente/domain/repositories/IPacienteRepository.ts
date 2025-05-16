import { ICreatePacienteDTO } from "../models/ICreatePacienteDTO";
import { IPaciente } from "../models/IPaciente";

export interface IPacienteRepository {
    create(data: ICreatePacienteDTO): Promise<IPaciente>;
    findById(id: number): Promise<IPaciente | null>
}