import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'pedido' })
export class PedidoEntidad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50
  })
  nombre: string;

  @Column({
    length: 13
  })
  celular: string;

  @Column({
    length: 100
  })
  direccion: string;

  @Column()
  fechaCreacion: Date;

  @Column({
    nullable: true
  })
  fechaPago: Date;

  @Column("simple-array")
  detalle: string[];
}
