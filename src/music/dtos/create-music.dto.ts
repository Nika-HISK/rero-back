import { IsNumber, IsString } from 'class-validator';

export class CreateMusicDto {
  @IsString()
  name: string;

  @IsString()
  url: string;

  @IsNumber()
  id: number;

  @IsNumber()
  artistId: number;
}
