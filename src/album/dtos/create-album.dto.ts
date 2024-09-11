import { Type } from 'class-transformer';
import { IsNumber, IsString, ValidateNested } from 'class-validator';
import { CreateMusicDto } from 'src/music/dtos/create-music.dto';

export class CreateAlbumDto {
  @IsString()
  name: string;

  @IsNumber()
  artistId: number;

  @IsString()
  releaseDate: string;

  @ValidateNested({ each: true })
  @Type(() => CreateMusicDto)
  musics: CreateMusicDto[];
}
