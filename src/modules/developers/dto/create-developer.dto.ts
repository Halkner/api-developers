import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDeveloperDto {
  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    description: 'Indica se o desenvolvedor aceita trabalho remoto',
    type: Boolean,
    required: false,
  })
  public acceptedRemoteWork: boolean;

  @ApiProperty({
    description: 'Quantidade de meses de experiência do desenvolvedor',
    type: Number,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  public monthsOfExperience: number;

  @ApiProperty({
    description: 'Identificador do usuário associado ao desenvolvedor',
    type: Number,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  public user_id: number;

  @ApiProperty({
    description:
      'Lista de identificadores das tecnologias que o desenvolvedor domina',
    type: [Number],
    required: true,
  })
  @IsNotEmpty()
  public technologies: number[];
}
