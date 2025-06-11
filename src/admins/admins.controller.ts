import { Controller, Get, Post, Body, Patch, Param, Delete,Query,ParseIntPipe, UseGuards } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { RolesGuard } from 'src/auth/guards';
import { Roles } from 'src/auth/decorators/role.decorator';
import { Role } from 'src/profiles/entities/profile.entity';
import { ApiBearerAuth,ApiQuery,ApiTags } from '@nestjs/swagger';

@ApiTags('admins')
@ApiBearerAuth()
@UseGuards(RolesGuard)
@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Roles(Role.ADMIN)
  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminsService.create(createAdminDto);
  }

  @ApiQuery({
    name:'name',
    required: false,
    description: 'Search Admin by profile name'
  })
  @Roles(Role.ADMIN)
  @Get()
  findAll(@Query('name') name?: string) {
    return this.adminsService.findAll(name);
  }

  @Roles(Role.ADMIN)
  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.adminsService.findOne(id);
  }

  @Roles(Role.ADMIN)
  @Patch(':id')
  update(@Param('id',ParseIntPipe) id: number, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminsService.update(id, updateAdminDto);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.adminsService.remove(id);
  }
}
