import { Transform } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateMusicDto {
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

  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  @IsNumber({}, { message: 'artistId must be a number' })
  artistId: number;

  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  @IsOptional()
  @IsNumber({}, { message: 'albumId must be a number' })
  albumId?: number;
}
