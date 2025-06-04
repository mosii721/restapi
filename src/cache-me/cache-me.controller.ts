import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CacheMeService } from './cache-me.service';
import { CreateCacheMeDto } from './dto/create-cache-me.dto';
import { CacheTTL } from '@nestjs/cache-manager';


@Controller('cache')
export class CacheMeController {
  constructor(private readonly cacheMeService: CacheMeService) {}

  @Post()
  create(@Body() createCacheMeDto: CreateCacheMeDto) {
    return this.cacheMeService.create(createCacheMeDto);
  }

  @Get(':key')
  get(@Param('key') key: string) {
    return this.cacheMeService.get(key);
  }



  @Delete(':key')
  remove(@Param('key') key: string) {
    return this.cacheMeService.remove(key);
  }
}
