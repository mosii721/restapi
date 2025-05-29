import { Controller, Get, Post, Body, Patch, Param, Delete,ParseIntPipe,Query } from '@nestjs/common';
import { UserprofilesService } from './userprofiles.service';
import { CreateUserprofileDto } from './dto/create-userprofile.dto';
import { UpdateUserprofileDto } from './dto/update-userprofile.dto';

@Controller('userprofiles')
export class UserprofilesController {
  constructor(private readonly userprofilesService: UserprofilesService) {}

  @Post()
  create(@Body() createUserprofileDto: CreateUserprofileDto) {
    return this.userprofilesService.create(createUserprofileDto);
  }

  @Get()
  findAll(@Query('email') email?: string) {
    return this.userprofilesService.findAll(email);
  }

  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.userprofilesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id',ParseIntPipe) id: number, @Body() updateUserprofileDto: UpdateUserprofileDto) {
    return this.userprofilesService.update(id, updateUserprofileDto);
  }

  @Delete(':id')
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.userprofilesService.remove(id);
  }
}
