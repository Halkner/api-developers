import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('app')
@Controller('public')
export class AppController {
  @ApiOperation({
    description: 'Verifica se a API está funcionando corretamente',
  })
  @Get()
  healthCheck(): string {
    return 'API ON';
  }
}
