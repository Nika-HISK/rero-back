import { IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateMusicDto } from 'src/music/dtos/create-music.dto';

export class CreatePlaylistDto {
  @IsString()
  playlistName: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateMusicDto)
  musics: CreateMusicDto[];
}
