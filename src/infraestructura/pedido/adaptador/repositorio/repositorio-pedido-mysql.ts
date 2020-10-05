import { RepositorioPedido } from 'src/dominio/pedido/puerto/repositorio/repositorio-pedido';
import { Pedido } from 'src/dominio/pedido/modelo/pedido';
import { InjectRepository } from '@nestjs/typeorm';
import { PedidoEntidad } from '../../entidad/pedido.entidad';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { PedidoDto } from 'src/aplicacion/pedido/consulta/dto/pedido.dto';

@Injectable()
export class RepositorioPedidoMysql implements RepositorioPedido {
  constructor(
    @InjectRepository(PedidoEntidad)
    private readonly repositorio: Repository<PedidoEntidad>,
  ) {}
  
  async tomarPedido(pedido: Pedido): Promise<PedidoDto> {
    const entidad = new PedidoEntidad();
    entidad.nombre = pedido.nombre;
    entidad.celular = pedido.celular;
    entidad.direccion = pedido.direccion;
    entidad.fechaCreacion = pedido.fechaCreacion;
    entidad.detalle = pedido.detalle;
    
    const pedidoEntidad = await this.repositorio.save(entidad);
    
    const pedidoDto = new PedidoDto();
    pedidoDto.id = pedidoEntidad.id;
    pedidoDto.nombre = pedidoEntidad.nombre;
    pedidoDto.celular = pedidoEntidad.celular;
    pedidoDto.direccion = pedidoEntidad.direccion;
    pedidoDto.fechaCreacion = pedidoEntidad.fechaCreacion;
    pedidoDto.detalle = pedidoEntidad.detalle;
    
    return pedidoDto;
  }
}
