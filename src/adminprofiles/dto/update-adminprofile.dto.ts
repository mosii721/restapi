import { PartialType } from '@nestjs/mapped-types';
import { CreateAdminprofileDto } from './create-adminprofile.dto';

export class UpdateAdminprofileDto extends PartialType(CreateAdminprofileDto) {}
