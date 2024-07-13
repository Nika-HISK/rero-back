import { Type } from "class-transformer";
import { IsString, ValidateNested } from "class-validator";
import { CreateMusicDto } from "src/music/dtos/create-music.dto";
import { Column, PrimaryGeneratedColumn } from "typeorm";




export class CreateAlbumDto {

    @IsString()
    title:string

    @IsString()
    releaseDate:string

    
    @ValidateNested({ each: true })
    @Type(() => CreateMusicDto)
    students: CreateMusicDto[];
}
