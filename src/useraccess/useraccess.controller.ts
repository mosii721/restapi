import { Controller, Get, Post, Body, Patch, Param, Delete,ParseIntPipe, UseGuards } from '@nestjs/common';
import { UseraccessService } from './useraccess.service';
import { CreateUseraccessDto } from './dto/create-useraccess.dto';
import { UpdateUseraccessDto } from './dto/update-useraccess.dto';
import { RolesGuard } from 'src/auth/guards';
import { Roles } from 'src/auth/decorators/role.decorator';
import { Role } from 'src/profiles/entities/profile.entity';
import { ApiBearerAuth,ApiQuery,ApiTags } from '@nestjs/swagger';

@ApiTags('useraccess')
@ApiBearerAuth()
@UseGuards(RolesGuard)
@Controller('useraccess')
export class UseraccessController {
  constructor(private readonly useraccessService: UseraccessService) {}

  @Roles(Role.ADMIN)
  @Post()
  create(@Body() createUseraccessDto: CreateUseraccessDto) {
    return this.useraccessService.create(createUseraccessDto);
  }

  @ApiQuery({
      required: false,
      description: 'Get all useraccess'
    })
  @Roles(Role.ADMIN)
  @Get()
    findAll() {
      return this.useraccessService.findAll();
    }

  @Roles(Role.ADMIN,Role.USER)
  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.useraccessService.findOne(id);
  }

  @Roles(Role.ADMIN)
  @Patch(':id')
  update(@Param('id',ParseIntPipe) id: number, @Body() updateUseraccessDto: UpdateUseraccessDto) {
    return this.useraccessService.update(id, updateUseraccessDto);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.useraccessService.remove(id);
  }
}
