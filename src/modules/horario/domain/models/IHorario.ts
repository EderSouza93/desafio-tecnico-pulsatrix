export interface IHorario {
    id: number;
    medico_id: number;
    data: string;
    hora_inicio: string;
    hora_fim: string;
    criado_em: Date
}