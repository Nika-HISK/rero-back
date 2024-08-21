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
        const music = await this.musicService.create(musicDto);
        musicEntities.push(music);
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
    const existingPlaylist = await this.playlistRepository.findOne(id);
    if (!existingPlaylist) {
      throw new Error('Playlist not found');
    }
    const updatedPlaylist = {
      ...existingPlaylist,
      name: updatePlaylistDto.name ?? existingPlaylist.name,
      description:
        updatePlaylistDto.description ?? existingPlaylist.description,
    };
    if (updatePlaylistDto.musics && updatePlaylistDto.musics.length > 0) {
      const musicEntities: Music[] = [];
      for (const musicDto of updatePlaylistDto.musics) {
        const music = await this.musicService.create(musicDto);
        musicEntities.push(music);
      }
      updatedPlaylist.musics = musicEntities;
    }

    return this.playlistRepository.update(id, updatePlaylistDto);
  }

  async findAll(): Promise<Playlist[]> {
    return this.playlistRepository.findAll();
  }

  async findOne(id: number): Promise<Playlist> {
    return this.playlistRepository.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.playlistRepository.delete(id);
  }
}
