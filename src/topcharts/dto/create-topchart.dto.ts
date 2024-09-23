import { IsNumber, IsOptional, IsString } from "class-validator";
import { PrimaryGeneratedColumn, Timestamp } from "typeorm";


export class CreateTopchartDto {
    @IsString()
    name:string

    @IsOptional()
    @IsString()
    timestamp:string
}
