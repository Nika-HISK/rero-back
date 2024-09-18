import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { CreateMusicDto } from 'src/music/dtos/create-music.dto';

export class CreatePlaylistDto {
  @IsString()
  playlistName: string;

  @ValidateNested({ each: true })
  @Type(() => CreateMusicDto)
  musics: CreateMusicDto[];
}
