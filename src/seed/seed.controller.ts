import { Controller, HttpCode, HttpStatus, Logger, Post } from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  private readonly logger = new Logger(SeedController.name)
  constructor(private readonly seedService: SeedService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  seed(){
    this.logger.log('Seed endpoint called');
    return this.seedService.seed();
  }
}
