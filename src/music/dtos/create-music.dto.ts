import { IsNumber, IsString } from 'class-validator';

export class CreateMusicDto {
  @IsString()
  name: string;

  @IsString()
  url: string;

  @IsNumber()
  id: number;

  @IsString()
  duration:string

  @IsString()
  cover:string

  @IsNumber()
  artistId: number;
}
