import { Usuario } from "src/modules/usuarios/infra/database/entities/Usuario";
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";

@Entity('medico')
export class Medico {
    @PrimaryColumn()
    id: number;

    @OneToOne(() => Usuario)
    @JoinColumn({ name: 'id' })
    usuario: Usuario;

    @Column()
    especialidade: string;

    @Column()
    crm: string;
}