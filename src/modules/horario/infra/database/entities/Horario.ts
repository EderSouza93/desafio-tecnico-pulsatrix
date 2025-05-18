import { Medico } from "src/modules/medico/infra/database/entities/Medico";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("horario_disponivel")
export class HorarioDisponivel {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Medico)
  @JoinColumn({ name: "medico_id" })
  medico: Medico;

  @Column({ name: "medico_id" })
  medico_id: number;

  @Column({
    type: "varchar",
    length: 10,
   })
  data: string;

  @Column({ type: "time" })
  hora_inicio: string;

  @Column({ type: "time" })
  hora_fim: string;

  @CreateDateColumn({ name: "criado_em" })
  criado_em: Date;
}