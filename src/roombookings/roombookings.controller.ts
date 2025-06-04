import { Controller, Get, Post, Body, Patch, Param, Delete,ParseIntPipe } from '@nestjs/common';
import { RoombookingsService } from './roombookings.service';
import { CreateRoombookingDto } from './dto/create-roombooking.dto';
import { UpdateRoombookingDto } from './dto/update-roombooking.dto';

@Controller('roombookings')
export class RoombookingsController {
  constructor(private readonly roombookingsService: RoombookingsService) {}

  @Post()
  create(@Body() createRoombookingDto: CreateRoombookingDto) {
    return this.roombookingsService.create(createRoombookingDto);
  }

  @Get()
    findAll() {
      return this.roombookingsService.findAll();
    }

  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.roombookingsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id',ParseIntPipe) id: number, @Body() updateRoombookingDto: UpdateRoombookingDto) {
    return this.roombookingsService.update(id, updateRoombookingDto);
  }

  @Delete(':id')
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.roombookingsService.remove(id);
  }
}
