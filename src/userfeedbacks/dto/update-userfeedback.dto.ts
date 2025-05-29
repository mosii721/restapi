import { PartialType } from '@nestjs/mapped-types';
import { CreateUserfeedbackDto } from './create-userfeedback.dto';

export class UpdateUserfeedbackDto extends PartialType(CreateUserfeedbackDto) {}
