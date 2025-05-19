export interface IAgendamento {
    id: number;
    paciente_id: number;
    medico_id: number;
    horario_disponivel_id?: number | null;
    data: string;
    hora_inicio: string;
    hora_fim: string;
    status: 'AGENDADO' | 'CANCELADO' | 'REALIZADO';
    criado_em: Date;
    atualizado_em: Date;
}