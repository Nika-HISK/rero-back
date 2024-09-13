import { Music } from 'src/music/entities/music.entity';
import { Artist } from 'src/artist/entities/artist.entity';

export class AlbumResponseDto {
  id: number;
  name: string;
  releaseDate: string;
  musics: Music[];
  artist: Artist;
}
