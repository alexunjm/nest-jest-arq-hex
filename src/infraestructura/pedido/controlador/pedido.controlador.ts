import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ComandoTomarPedido } from 'src/aplicacion/pedido/comando/tomar-pedido.comando';
import { ManejadorTomarPedido } from 'src/aplicacion/pedido/comando/tomar-pedido.manejador';
import { PedidoDto } from 'src/aplicacion/pedido/consulta/dto/pedido.dto';
import { ManejadorListarPedido } from 'src/aplicacion/pedido/consulta/listar-pedidos.manejador';

@Controller('pedidos')
export class PedidoControlador {
  constructor(
    private readonly _manejadorTomarPedido: ManejadorTomarPedido,
    private readonly _manejadorListarPedido: ManejadorListarPedido,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async tomarPedido(@Body() comandoTomarPedido: ComandoTomarPedido) {
    await this._manejadorTomarPedido.ejecutar(comandoTomarPedido);
  }

  @Get()
  async listar(): Promise<PedidoDto[]> {
    return this._manejadorListarPedido.ejecutar();
  }
}
