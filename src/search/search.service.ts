import { Injectable } from '@nestjs/common';
import { AlbumRepository } from 'src/album/repositories/album.repository';
import { ArtistRepository } from 'src/artist/repositories/artist.repository';
import { MusicRepository } from 'src/music/repositories/music.repository';

@Injectable()
export class SearchService {
  constructor(
    private readonly albumRepository: AlbumRepository,
    private readonly artistRepository: ArtistRepository,
    private readonly musicRepository: MusicRepository,
  ) {}

  async search(query: string) {
    const albums = await this.albumRepository.findAll(query);
    const artists = await this.artistRepository.findAll(query);
    const musics = await this.musicRepository.findAll(query);
    return { albums, artists, musics };
  }
}
