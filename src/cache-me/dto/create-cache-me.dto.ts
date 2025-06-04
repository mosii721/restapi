import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString } from "class-validator";

export class CreateCacheMeDto {
    @ApiProperty({
        description: 'Unique key for cache entry',example: 'user'})
    @IsString()
    key: string;

    @ApiProperty({description: 'Value to be cached', example: 'John Doe'})
    @IsString()
    value:string;

    @ApiProperty({description: 'Time to live in seconds', example: 3600, required: false})
    @IsInt()
    @IsOptional()
    ttl?:number;
}