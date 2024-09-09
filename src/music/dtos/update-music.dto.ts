import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateMusicDto {
  @IsOptional()
  @IsString()
  name?: any;

  @IsOptional()
  @IsString()
  url?: any;

  @IsOptional()
  @IsNumber()
  artistId?: any;

  @IsOptional()
  @IsNumber()
  albumId?: any;
}
