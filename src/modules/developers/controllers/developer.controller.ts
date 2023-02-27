import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateDeveloperDto } from '../dto/create-developer.dto';
import { CreateTechnologyDto } from '../dto/create-technology.dto';
import { UpdateDeveloperDto } from '../dto/update-developer.dto';
import { DeveloperEntity } from '../entities/developer.entity';
import { TechnologyEntity } from '../entities/technology.entity';
import { DeveloperService } from '../services/developer.service';
import { TechnologyService } from '../services/technology.service';

@ApiTags('developers')
@Controller('developer')
export class DeveloperController {
  constructor(
    private developerService: DeveloperService,
    private technologyService: TechnologyService,
  ) {}

  @ApiParam({ name: 'id', type: Number })
  @ApiOperation({
    description: 'Retorna um desenvolvedor pelo ID',
  })
  @ApiOkResponse({
    type: DeveloperEntity,
  })
  @Get('getDeveloperById/:id')
  async getDeveloperById(@Param('id') id: number): Promise<DeveloperEntity> {
    return await this.developerService.findById(id);
  }

  @ApiOperation({
    description: 'Retorna uma tecnologia pelo ID',
  })
  @ApiOkResponse({
    type: TechnologyEntity,
  })
  @Get('getTechnologyById/:id')
  async getTechnologyById(@Param('id') id: number): Promise<TechnologyEntity> {
    return await this.technologyService.findById(id);
  }

  @ApiOperation({
    description: 'Cria uma nova tecnologia',
  })
  @ApiCreatedResponse({
    type: TechnologyEntity,
  })
  @Post('createTechnology')
  async createTechnology(
    @Body() newTechnology: CreateTechnologyDto,
  ): Promise<TechnologyEntity> {
    return await this.technologyService.createTechnology(newTechnology);
  }

  @ApiOperation({
    description: 'Cria várias tecnologias',
  })
  @ApiCreatedResponse({
    type: [TechnologyEntity],
  })
  @Post('createManyTechnologies')
  async createManyTechnologies(
    @Body() newTechnologies: CreateTechnologyDto[],
  ): Promise<TechnologyEntity[]> {
    return await this.technologyService.createManyTechnologies(newTechnologies);
  }

  @ApiOperation({
    description: 'Cria um novo desenvolvedor',
  })
  @ApiCreatedResponse({
    type: DeveloperEntity,
  })
  @Post('createDeveloper')
  async createDeveloper(
    @Body() newDeveloper: CreateDeveloperDto,
  ): Promise<DeveloperEntity> {
    return await this.developerService.createDeveloper(newDeveloper);
  }

  @ApiOperation({
    description: 'Atualiza um desenvolvedor existente',
  })
  @ApiOkResponse({
    type: DeveloperEntity,
  })
  @Patch('updateDeveloper/:id')
  async updateDeveloper(
    @Param('id') id: number,
    @Body() updateDeveloperDto: UpdateDeveloperDto,
  ): Promise<DeveloperEntity> {
    return await this.developerService.updateDeveloper(id, updateDeveloperDto);
  }
}
