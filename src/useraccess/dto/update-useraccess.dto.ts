import { PartialType } from '@nestjs/mapped-types';
import { CreateUseraccessDto } from './create-useraccess.dto';
import {IsNumber,IsOptional} from 'class-validator';

export class UpdateUseraccessDto extends PartialType(CreateUseraccessDto) {
    @IsOptional()
    @IsNumber()
    login_count?: number;
}
