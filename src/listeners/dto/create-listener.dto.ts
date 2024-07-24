import { IsNumber } from "class-validator";
import { PrimaryGeneratedColumn } from "typeorm";

export class CreateListenerDto {
    @IsNumber()
    listned:number

    @IsNumber()
    today:number
}
