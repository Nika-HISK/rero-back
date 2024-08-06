import { IsNumber, IsOptional, IsString } from "class-validator";
import { PrimaryGeneratedColumn, Timestamp } from "typeorm";

export class CreateListenerDto {
    // @IsString()
    // name:string

    @IsOptional()
    @IsString()
    timestamp:string
}


