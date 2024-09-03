import { Type } from "class-transformer";
import { IsString, ValidateNested } from "class-validator";
import { CreateAlbumDto } from "src/album/dtos/create-album.dto";
import { CreateMusicDto } from "src/music/dtos/create-music.dto";

export class CreateArtistDto {
    @IsString()
    artistName: string;

    @IsString()
    biography: string;

    @IsString()
    artistPhoto: string;

    @ValidateNested({ each: true })
    @Type(() => CreateMusicDto)
    musics: CreateMusicDto[];

    @ValidateNested({ each: true })
    @Type(() => CreateAlbumDto)
    albums: CreateAlbumDto[];

}