import { ICreateHorarioDTO } from "../models/ICreateHorarioDTO";
import { IHorario } from "../models/IHorario";

export interface IHorarioRepository {
    create(data: ICreateHorarioDTO): Promise<IHorario>;
    findByHorario(
        medico_id: number,
        data: string,
        hora_inicio: string,
        hora_fim: string,
    ): Promise<IHorario | null>

    findAll(): Promise<IHorario[]>;

    findByMedico(medico_id: number, data?: string): Promise<IHorario[]>;

    deleteById(id: number, medico_id: number): Promise<void>;

    findById(id: number): Promise<IHorario | null>;
}