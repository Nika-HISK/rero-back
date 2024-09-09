import { Type } from "class-transformer";
import { IsString, ValidateNested } from "class-validator";
import { CreateMusicDto } from "src/music/dtos/create-music.dto";


export class CreateAlbumDto {

    @IsString()
    albumName: string

    @IsString()
    releaseDate: string

    @ValidateNested({ each: true })
    @Type(() => CreateMusicDto)
    musics: CreateMusicDto[];
}
