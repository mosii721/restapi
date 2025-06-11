import { Controller, Get, Post, Body, Patch, Param, Delete,ParseIntPipe, UseGuards } from '@nestjs/common';
import { RoombookingsService } from './roombookings.service';
import { CreateRoombookingDto } from './dto/create-roombooking.dto';
import { UpdateRoombookingDto } from './dto/update-roombooking.dto';
import { RolesGuard } from 'src/auth/guards';
import { Roles } from 'src/auth/decorators/role.decorator';
import { Role } from 'src/profiles/entities/profile.entity';
import { ApiBearerAuth,ApiQuery,ApiTags } from '@nestjs/swagger';

@ApiTags('roombookings')
@ApiBearerAuth()
@UseGuards(RolesGuard)
@Controller('roombookings')
export class RoombookingsController {
  constructor(private readonly roombookingsService: RoombookingsService) {}

  @Roles(Role.ADMIN)
  @Post()
  create(@Body() createRoombookingDto: CreateRoombookingDto) {
    return this.roombookingsService.create(createRoombookingDto);
  }

  @ApiQuery({
      required: false,
      description: 'Get all roombookings'
    })
  @Roles(Role.ADMIN)
  @Get()
    findAll() {
      return this.roombookingsService.findAll();
    }

  @Roles(Role.ADMIN,Role.USER)
  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.roombookingsService.findOne(id);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.roombookingsService.remove(id);
  }
}
