import { IsString} from 'class-validator';

export class CreatePlaylistDto {
  @IsString()
  playlistName: string;

}
