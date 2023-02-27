import { IsNotEmpty, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTechnologyDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Nome da tecnologia a ser criada',
    type: String,
    required: true,
  })
  public name: string;
}
