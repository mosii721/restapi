import { Controller, Get, Post, Body, Patch, Param, Delete,Query,ParseIntPipe } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminsService.create(createAdminDto);
  }

  @Get()
  findAll(@Query('name') name?: string) {
    return this.adminsService.findAll(name);
  }

  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.adminsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id',ParseIntPipe) id: number, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminsService.update(id, updateAdminDto);
  }

  @Delete(':id')
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.adminsService.remove(id);
  }
}
