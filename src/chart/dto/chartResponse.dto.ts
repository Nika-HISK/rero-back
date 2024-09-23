import { IsNumber, IsOptional, IsString } from 'class-validator';

export class MusicResponseDto {
  id: number;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  musicAudio?: string;

  @IsOptional()
  @IsString()
  coverImage?: string;

  @IsOptional()
  @IsString()
  duration?: string; 

  @IsNumber()
  artistId: number;
}
