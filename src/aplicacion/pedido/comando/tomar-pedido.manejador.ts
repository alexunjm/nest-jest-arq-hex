import { Injectable } from '@nestjs/common';
import { ServicioTomarPedido } from 'src/dominio/pedido/servicio/servicio-tomar-pedido';
import { ComandoTomarPedido } from './tomar-pedido.comando';
import { Pedido } from 'src/dominio/pedido/modelo/pedido';

@Injectable()
export class ManejadorTomarPedido {
  constructor(private _servicioTomarPedido: ServicioTomarPedido) {}

  async ejecutar(comandoTomarPedido: ComandoTomarPedido) {
    await this._servicioTomarPedido.ejecutar(
      new Pedido(/* 
        comandoTomarPedido.fechaCreacion, */
      ),
    );
  }
}
