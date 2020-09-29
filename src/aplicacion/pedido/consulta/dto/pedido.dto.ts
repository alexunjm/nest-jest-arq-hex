import { ApiProperty } from '@nestjs/swagger';

export class PedidoDto {

  @ApiProperty({ type: Date })
  fecha: string;
  
  @ApiProperty({ type: Date })
  fechaPago: string;
}
