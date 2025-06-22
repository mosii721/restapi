import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/role.decorator';
import { RolesGuard } from 'src/auth/guards';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Role } from './entities/profile.entity';
import { ProfilesService } from './profiles.service';
import { ApiBearerAuth,ApiQuery,ApiTags } from '@nestjs/swagger';

@ApiTags('profiles')
@ApiBearerAuth()
@UseGuards(RolesGuard)
@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Public()
  @Post()
  create(@Body() createProfileDto: CreateProfileDto) {
    return this.profilesService.create(createProfileDto);
  }

  @ApiQuery({
      name:'email',
      required: false,
      description: 'Search for Profile by email'
    })
  @Roles(Role.ADMIN)
  @Get()
  findAll(@Query('email')email?:string) {
    if (email){
      return this.profilesService.findAll(email);
    }
    return this.profilesService.findAll()
    
  }

  @Roles(Role.ADMIN,Role.USER)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.profilesService.findOne(id);
  }

  @Roles(Role.ADMIN,Role.USER)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profilesService.update(id, updateProfileDto);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.profilesService.remove(id);
  }
}
