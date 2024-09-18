import { Transform, Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { CreateMusicDto } from 'src/music/dtos/create-music.dto';

export class CreateAlbumDto {
  @IsString()
  name: string;

  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  @IsNumber()
  artistId: number;

  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  @IsNumber()
  musicId: number;

  @IsOptional()
  @IsString()
  releaseDate?: string;

  @IsOptional()
  @IsString()
  albumCover?: string;

  @ValidateNested({ each: true })
  @Type(() => CreateMusicDto)
  musics: CreateMusicDto[];
}
