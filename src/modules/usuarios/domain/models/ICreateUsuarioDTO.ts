export interface ICreateUsuarioDTO {
    nome: string;
    email: string;
    senha_hash: string;
    tipo: 'MEDICO' | 'PACIENTE';
}