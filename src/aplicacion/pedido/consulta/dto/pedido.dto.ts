import { ApiProperty } from '@nestjs/swagger';

export class PedidoDto {

  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Alex' })
  public nombre: string;

  @ApiProperty({ minLength: 7, maxLength: 13, example: '3012129921' })
  public celular: string;

  @ApiProperty({ example: 'calle 94a #63a-80' })
  public direccion: string;

  @ApiProperty()
  public detalle: string[];

  @ApiProperty({ type: Date })
  public fechaCreacion: string;

  @ApiProperty({ type: Date })
  public fechaPago: string;
}
