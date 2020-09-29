import { RepositorioPedido } from 'src/dominio/pedido/puerto/repositorio/repositorio-pedido';
import { Pedido } from 'src/dominio/pedido/modelo/pedido';
import { InjectRepository } from '@nestjs/typeorm';
import { PedidoEntidad } from '../../entidad/pedido.entidad';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RepositorioPedidoMysql implements RepositorioPedido {
  constructor(
    @InjectRepository(PedidoEntidad)
    private readonly repositorio: Repository<PedidoEntidad>,
  ) {}
  
  async tomarPedido(pedido: Pedido): Promise<Pedido> {
    const entidad = new PedidoEntidad();/* 
    entidad.clave = pedido.clave;
    entidad.fechaCreacion = pedido.fechaCreacion;
    entidad.nombre = pedido.nombre; */
    
    await this.repositorio.save(entidad);
    return pedido;
  }
}
