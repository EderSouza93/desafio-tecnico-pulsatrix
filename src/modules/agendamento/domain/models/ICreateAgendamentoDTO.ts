export interface ICreateAgendamentoDTO {
    paciente_id: number;
    medico_id: number;
    data: string;
    hora_inicio: string;
    hora_fim: string;
    horario_disponivel_id?: number | null;
}