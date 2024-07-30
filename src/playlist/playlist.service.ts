import { Injectable } from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { PlaylistRepository } from './repositories/playlist.repository';

@Injectable()
export class PlaylistService {
  constructor(private readonly playlistRepo: PlaylistRepository) {}

  create(createPlaylistDto: CreatePlaylistDto) {
    return this.playlistRepo.create(createPlaylistDto);
  }

  findAll() {
    return this.playlistRepo.findAll();
  }

  findOne(id: number) {
    return this.playlistRepo.findOne(id);
  }

  update(id: number, updateArtistDto: UpdatePlaylistDto) {
    return this.playlistRepo.update(id, updateArtistDto);
  }

  delete(id: number) {
    return this.playlistRepo.delete(id);
  }
}
