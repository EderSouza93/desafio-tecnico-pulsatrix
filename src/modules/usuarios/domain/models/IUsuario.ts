export interface IUsuario {
    id: number;
    nome: string;
    email: string;
    senha_hash: string;
    tipo: 'MEDICO' | 'PACIENTE';
    criado_em: Date;
}