import { PartialType } from '@nestjs/mapped-types';
import { CreateCacheMeDto } from './create-cache-me.dto';

export class UpdateCacheMeDto extends PartialType(CreateCacheMeDto) {}
