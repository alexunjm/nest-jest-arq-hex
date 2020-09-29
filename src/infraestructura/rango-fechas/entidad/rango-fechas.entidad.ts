import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'rango-fechas' })
export class RangoFechasEntidad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  desde: Date;

  @Column()
  hasta: Date;

  @Column()
  activa: boolean;
}
