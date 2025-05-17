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
    type: "date",
    transformer: {
      to(value: string | Date): string {
        if (value instanceof Date) {
          return value.toISOString().slice(0, 10);
        }
        return value; 
      },
      from(value: string): string {
        return value;
      },
    },
  })
  data: string;

  @Column({ type: "time" })
  hora_inicio: string;

  @Column({ type: "time" })
  hora_fim: string;

  @CreateDateColumn({ name: "criado_em" })
  criado_em: Date;
}