import { HorarioDisponivel } from "src/modules/horario/infra/database/entities/Horario";
import { Medico } from "src/modules/medico/infra/database/entities/Medico";
import { Paciente } from "src/modules/paciente/infra/database/entities/Paciente";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("agendamento")
export class Agendamento {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Paciente)
    @JoinColumn({ name: "paciente_id" })
    paciente: Paciente;

    @Column({ name: "paciente_id" })
    paciente_id: number;

    @ManyToOne(() => Medico)
    @JoinColumn({ name: "medico_id" })
    medico: Medico;

    @Column({ name: "medico_id" })
    medico_id: number;

    @OneToOne(() => HorarioDisponivel, { nullable: true })
    @JoinColumn({ name: "horario_disponivel_id" })
    horarioDisponivel?: HorarioDisponivel;
    
    @Column({ type: "varchar", length: '10' })
    data: string;

    @Column({ type: 'time' })
    hora_inicio: string;

    @Column({ type: 'time' })
    hora_fim: string;

    @Column({
        type: 'enum',
        enum: ['AGENDADO', 'CANCELADO', 'REALIZADO'],
        default: 'AGENDADO',
    })
    status: 'AGENDADO' | 'CANCELADO' | 'REALIZADO';

    @CreateDateColumn({ name: 'criado_em' })
    criado_em: Date;

    @UpdateDateColumn({ name: 'atualizado_em' })
    atualizado_em: Date;
}