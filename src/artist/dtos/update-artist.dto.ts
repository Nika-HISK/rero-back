import { IsString, IsOptional } from 'class-validator';

export class UpdateArtistDto {
  @IsString()
  @IsOptional()
  artistName?: string;

  @IsString()
  @IsOptional()
  biography?: string;

  @IsString()
  @IsOptional()
  artistPhoto?: string;


}
