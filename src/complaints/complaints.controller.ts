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
import { ComplaintsService } from './complaints.service';
import { CreateComplaintDto } from './dto/create-complaint.dto';
import { UpdateComplaintDto } from './dto/update-complaint.dto';
import { RolesGuard } from 'src/auth/guards';
import { Roles } from 'src/auth/decorators/role.decorator';
import { Role } from 'src/profiles/entities/profile.entity';
import { ApiBearerAuth,ApiQuery,ApiTags } from '@nestjs/swagger';

@ApiTags('complaints')
@ApiBearerAuth()
@UseGuards(RolesGuard)
@Controller('complaints')
export class ComplaintsController {
  constructor(private readonly complaintsService: ComplaintsService) {}

  @Roles(Role.ADMIN, Role.USER)
  @Post()
  create(@Body() createComplaintDto: CreateComplaintDto) {
    return this.complaintsService.create(createComplaintDto);
  }

  @ApiQuery({
      required: false,
      description: 'Get all complaints'
    })
  @Roles(Role.ADMIN, Role.USER, Role.GUEST)
  @Get()
    findAll() {
      return this.complaintsService.findAll();
    }

  @Roles(Role.ADMIN, Role.USER, Role.GUEST)
  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.complaintsService.findOne(+id);
  }

  @Roles(Role.ADMIN, Role.USER)
  @Patch(':id')
  update(
    @Param('id',ParseIntPipe) id: number,
    @Body() updateComplaintDto: UpdateComplaintDto,
  ) {
    return this.complaintsService.update(+id, updateComplaintDto);
  }

  @Roles(Role.ADMIN, Role.USER)
  @Delete(':id')
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.complaintsService.remove(+id);
  }
}
