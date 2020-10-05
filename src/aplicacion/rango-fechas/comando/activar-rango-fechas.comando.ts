import { IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ComandoActivarRangoFechas {
  @IsDate()
  @ApiProperty({ type: Date, example: new Date() })
  public desde: Date;

  @IsDate()
  @ApiProperty({ type: Date, example: new Date() })
  public hasta: Date;
}
