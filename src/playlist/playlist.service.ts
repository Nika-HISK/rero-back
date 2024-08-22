import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Playlist } from './entities/playlist.entity';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { MusicService } from 'src/music/music.service';
import { Music } from 'src/music/entities/music.entity';
import { PlaylistRepository } from './repositories/playlist.repository';

@Injectable()
export class PlaylistService {
  constructor(
    private readonly playlistRepository: PlaylistRepository,
    private readonly musicService: MusicService,
  ) {}

  async create(createPlaylistDto: CreatePlaylistDto): Promise<Playlist> {
    const musicEntities: Music[] = [];

    if (createPlaylistDto.musics && createPlaylistDto.musics.length > 0) {
      for (const musicDto of createPlaylistDto.musics) {
        const music = await this.musicService.findByProperties(musicDto);
        if (music) {
          musicEntities.push(music);
        } else {
          throw new Error(`Music not found for name: ${musicDto.name}`);
        }
      }
    }

    return this.playlistRepository.createPlaylist(
      createPlaylistDto,
      musicEntities,
    );
  }

  async update(
    id: number,
    updatePlaylistDto: UpdatePlaylistDto,
  ): Promise<Playlist> {
    let musicEntities: Music[] = [];

    if (updatePlaylistDto.musics && updatePlaylistDto.musics.length > 0) {
      for (const musicDto of updatePlaylistDto.musics) {
        const music = await this.musicService.findByProperties(musicDto);
        if (music) {
          musicEntities.push(music);
        } else {
          throw new Error(`Music not found for name: ${musicDto.name}`);
        }
      }
    }

    return this.playlistRepository.update(id, updatePlaylistDto, musicEntities);
  }

  async findOne(id: number): Promise<Playlist> {
    return this.playlistRepository.findOne(id);
  }

  async findAll(): Promise<Playlist[]> {
    return this.playlistRepository.findAll();
  }

  async delete(id: number): Promise<void> {
    await this.playlistRepository.delete(id);
  }
}
