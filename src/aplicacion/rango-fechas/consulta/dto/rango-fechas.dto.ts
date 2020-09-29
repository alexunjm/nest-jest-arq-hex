import { ApiProperty } from '@nestjs/swagger';

export class RangoFechasDto {

  @ApiProperty({ type: Date })
  desde: string;
  
  @ApiProperty({ type: Date })
  hasta: string;
}
