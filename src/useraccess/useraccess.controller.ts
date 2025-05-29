import { Controller, Get, Post, Body, Patch, Param, Delete,ParseIntPipe } from '@nestjs/common';
import { UseraccessService } from './useraccess.service';
import { CreateUseraccessDto } from './dto/create-useraccess.dto';
import { UpdateUseraccessDto } from './dto/update-useraccess.dto';

@Controller('useraccess')
export class UseraccessController {
  constructor(private readonly useraccessService: UseraccessService) {}

  @Post()
  create(@Body() createUseraccessDto: CreateUseraccessDto) {
    return this.useraccessService.create(createUseraccessDto);
  }

  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.useraccessService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id',ParseIntPipe) id: number, @Body() updateUseraccessDto: UpdateUseraccessDto) {
    return this.useraccessService.update(id, updateUseraccessDto);
  }

  @Delete(':id')
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.useraccessService.remove(id);
  }
}
