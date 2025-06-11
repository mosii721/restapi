import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UserfeedbacksService } from './userfeedbacks.service';
import { CreateUserfeedbackDto } from './dto/create-userfeedback.dto';
import { UpdateUserfeedbackDto } from './dto/update-userfeedback.dto';
import { RolesGuard } from 'src/auth/guards';
import { Roles } from 'src/auth/decorators/role.decorator';
import { Role } from 'src/profiles/entities/profile.entity';
import { ApiBearerAuth,ApiQuery,ApiTags } from '@nestjs/swagger';

@ApiTags('userfeedbacks')
@ApiBearerAuth()
@UseGuards(RolesGuard)
@Controller('userfeedbacks')
export class UserfeedbacksController {
  constructor(private readonly userfeedbacksService: UserfeedbacksService) {}

  @Roles(Role.ADMIN,Role.USER)
  @Post()
  create(@Body() createUserfeedbackDto: CreateUserfeedbackDto) {
    return this.userfeedbacksService.create(createUserfeedbackDto);
  }

  @ApiQuery({
      required: false,
      description: 'Get all userfeedbacks'
    })
  @Roles(Role.ADMIN,Role.USER,Role.GUEST)
  @Get()
    findAll() {
      return this.userfeedbacksService.findAll();
    }

  @Roles(Role.ADMIN,Role.USER,Role.GUEST)
  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.userfeedbacksService.findOne(id);
  }

  @Roles(Role.ADMIN,Role.USER)
  @Patch(':id')
  update(
    @Param('id',ParseIntPipe) id: number,
    @Body() updateUserfeedbackDto: UpdateUserfeedbackDto,
  ) {
    return this.userfeedbacksService.update(id, updateUserfeedbackDto);
  }

  @Roles(Role.ADMIN,Role.USER)
  @Delete(':id')
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.userfeedbacksService.remove(id);
  }
}
