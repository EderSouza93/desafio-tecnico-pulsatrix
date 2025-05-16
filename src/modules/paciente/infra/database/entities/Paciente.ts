import { Usuario } from "src/modules/usuarios/infra/database/entities/Usuario";
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";

@Entity('paciente')
export class Paciente {
    @PrimaryColumn()
    id: number;

    @OneToOne(() => Usuario)
    @JoinColumn({ name: 'id' })
    usuario: Usuario;

    @Column()
    telefone: string;

    @Column({ type: 'date' })
    data_nascimento: string;
}