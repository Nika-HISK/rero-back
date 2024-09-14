import { IsOptional, IsString } from 'class-validator';

export class ArtistResponseDto {
  id: number;

  @IsString()
  artistName: string;

  @IsString()
  biography: string;

  @IsOptional()
  @IsString()
  artistPhoto?: string;
}
