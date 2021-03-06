import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { DaoPedido } from 'src/dominio/pedido/puerto/dao/dao-pedido';
import { PedidoDto } from 'src/aplicacion/pedido/consulta/dto/pedido.dto';

@Injectable()
export class DaoPedidoMysql implements DaoPedido {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async listar(): Promise<PedidoDto[]> {
    return this.entityManager.query([
      'SELECT p.id,',
        'p.nombre,',
        'p.celular,',
        'p.direccion,',
        'p.fechaCreacion,',
        'p.fechaPago,',
        'p.detalle',
      'FROM pedido p'
    ].join(' '));
  }
}
