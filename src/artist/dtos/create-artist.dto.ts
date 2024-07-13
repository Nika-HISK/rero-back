import { Type } from "class-transformer";
import { IsString, ValidateNested } from "class-validator";
import { CreateMusicDto } from "src/music/dtos/create-music.dto";
 
 
 
export class CreateArtistDto {
    @IsString()
    firstName:string

    @IsString()
    lastName:string

    @IsString()
    biography:string


    @ValidateNested({ each: true })
    @Type(() => CreateMusicDto)
    musics: CreateMusicDto[];
 

}