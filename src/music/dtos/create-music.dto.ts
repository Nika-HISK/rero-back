import { IsString } from 'class-validator';

export class CreateMusicDto {
  @IsString()
  name: string;

  @IsString()
  url: string;
}
