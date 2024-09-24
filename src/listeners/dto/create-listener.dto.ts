import { Transform } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";
import { PrimaryGeneratedColumn, Timestamp } from "typeorm";

export class CreateListenerDto {
    @IsString()
    name:string

    @IsOptional()
    @IsString()
    timestamp:string

    @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
    @IsNumber()
    musicId:number
}


