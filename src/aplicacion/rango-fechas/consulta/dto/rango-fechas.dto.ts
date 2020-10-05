import { ApiProperty } from '@nestjs/swagger';

export class RangoFechasDto {

  @ApiProperty({ type: Date })
  desde: Date
  
  @ApiProperty({ type: Date })
  hasta: Date
}
