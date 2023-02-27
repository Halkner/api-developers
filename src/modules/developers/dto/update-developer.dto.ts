import { IsBoolean, IsNumber, IsOptional } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateDeveloperDto {
  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    description: 'Indica se o desenvolvedor aceita trabalho remoto',
    type: Boolean,
    required: false,
  })
  public acceptedRemoteWork: boolean;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    description: 'Quantidade de meses de experiência do desenvolvedor',
    type: Number,
    required: true,
  })
  public monthsOfExperience: number;

  @ApiProperty({
    description:
      'Lista de identificadores das tecnologias que o desenvolvedor domina',
    type: [Number],
    required: true,
  })
  @IsOptional()
  public technologies: number[];
}
