import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  UseGuards
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RolesGuard } from 'src/auth/guards';
import { Roles } from 'src/auth/decorators/role.decorator';
import { Role } from 'src/profiles/entities/profile.entity';
import { ApiBearerAuth,ApiQuery,ApiTags } from '@nestjs/swagger';

@ApiTags('rooms')
@ApiBearerAuth()
@UseGuards(RolesGuard)
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Roles(Role.ADMIN)
  @Post()
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto);
  }

  @ApiQuery({
      name:'search',
      required: false,
      description: 'Search for rooms'
    })
  @Roles(Role.ADMIN,Role.USER,Role.GUEST)
  @Get()
  findAll(@Query('search') search?: string) {
    return this.roomsService.findAll(search);
  }

  @Roles(Role.ADMIN,Role.USER,Role.GUEST)
  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.roomsService.findOne(id);
  }

  @Roles(Role.ADMIN)
  @Patch(':id')
  update(@Param('id',ParseIntPipe) id: number, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomsService.update(id, updateRoomDto);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.roomsService.remove(id);
  }
}
