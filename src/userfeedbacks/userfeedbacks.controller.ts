import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { UserfeedbacksService } from './userfeedbacks.service';
import { CreateUserfeedbackDto } from './dto/create-userfeedback.dto';
import { UpdateUserfeedbackDto } from './dto/update-userfeedback.dto';

@Controller('userfeedbacks')
export class UserfeedbacksController {
  constructor(private readonly userfeedbacksService: UserfeedbacksService) {}

  @Post()
  create(@Body() createUserfeedbackDto: CreateUserfeedbackDto) {
    return this.userfeedbacksService.create(createUserfeedbackDto);
  }

  @Get()
    findAll() {
      return this.userfeedbacksService.findAll();
    }

  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.userfeedbacksService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id',ParseIntPipe) id: number,
    @Body() updateUserfeedbackDto: UpdateUserfeedbackDto,
  ) {
    return this.userfeedbacksService.update(id, updateUserfeedbackDto);
  }

  @Delete(':id')
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.userfeedbacksService.remove(id);
  }
}
