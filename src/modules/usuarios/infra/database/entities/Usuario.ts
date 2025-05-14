import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

export type UsuarioTipo = 'MEDICO' | 'PACIENTE';

@Entity('usuario')
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column({ unique: true })
    email: string;

    @Column()
    senha_hash: string;

    @Column({ type: 'enum', enum: ['MEDICO', 'PACIENTE'] })
    tipo: UsuarioTipo;

    @CreateDateColumn({ name: 'criado_em' })
    criado_em: Date;
}