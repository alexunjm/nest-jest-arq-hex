import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'pedido' })
export class PedidoEntidad {
  @PrimaryGeneratedColumn()
  id: number;
/* 
  @Column()
  nombre: string;

  @Column()
  clave: string;
 */
  @Column()
  fechaCreacion: Date;
}
