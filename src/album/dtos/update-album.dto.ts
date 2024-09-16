import { IsOptional, IsString } from 'class-validator';

export class UpdateAlbumDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  releaseDate?: string;

  @IsOptional()
  @IsString()
  albumCover?: string;
}
