import { /* IsDateString,  */IsArray, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ComandoTomarPedido {

  @IsString()
  @ApiProperty({ example: 'Alex'})
  public nombre: string;

  @IsString()
  @ApiProperty({ minLength: 7, maxLength: 13, example: '3012129921'})
  public celular: string;

  @IsString()
  @ApiProperty({ example: 'calle 94a #63a-80'})
  public direccion: string;

  @IsArray()
  @ApiProperty()
  public detalle: string[];
/* 
  @IsDateString()
  @ApiProperty({ type: Date })
  public fechaCreacion: string; */
}
