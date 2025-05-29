import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe,Query} from '@nestjs/common';
import { AdminprofilesService } from './adminprofiles.service';
import { CreateAdminprofileDto } from './dto/create-adminprofile.dto';
import { UpdateAdminprofileDto } from './dto/update-adminprofile.dto';

@Controller('adminprofiles')
export class AdminprofilesController {
  constructor(private readonly adminprofilesService: AdminprofilesService) {}

  @Post()
  create(@Body() createAdminprofileDto: CreateAdminprofileDto) {
    return this.adminprofilesService.create(createAdminprofileDto);
  }

  @Get()
  findAll(@Query('email')email?:string) {
    return this.adminprofilesService.findAll(email);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.adminprofilesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateAdminprofileDto: UpdateAdminprofileDto) {
    return this.adminprofilesService.update(id, updateAdminprofileDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.adminprofilesService.remove(id);
  }
}
