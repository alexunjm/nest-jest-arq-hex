import { Injectable } from '@nestjs/common';
import { ServicioTomarPedido } from 'src/dominio/pedido/servicio/servicio-tomar-pedido';
import { ComandoTomarPedido } from './tomar-pedido.comando';
import { Pedido } from 'src/dominio/pedido/modelo/pedido';
import { PedidoDto } from '../consulta/dto/pedido.dto';

@Injectable()
export class ManejadorTomarPedido {
  constructor(private _servicioTomarPedido: ServicioTomarPedido) {}

  async ejecutar(comandoTomarPedido: ComandoTomarPedido): Promise<PedidoDto> {
    return this._servicioTomarPedido.ejecutar(
      new Pedido(
        comandoTomarPedido.nombre,
        comandoTomarPedido.celular,
        comandoTomarPedido.direccion,
        comandoTomarPedido.detalle,
      ),
    );
  }
}
