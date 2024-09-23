import { Injectable } from '@nestjs/common';
import { Playlist } from './entities/playlist.entity';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { PlaylistRepository } from './repositories/playlist.repository';


@Injectable()
export class PlaylistService {
  constructor(
    private readonly playlistRepository: PlaylistRepository,
  ) {}

  async create(createPlaylistDto: CreatePlaylistDto,userId:number): Promise<Playlist> {
    return await this.playlistRepository.createPlaylist(createPlaylistDto,userId);
  }

  async update(id: number, updatePlaylistDto: UpdatePlaylistDto): Promise<Playlist> {
    return this.playlistRepository.update(id, updatePlaylistDto);
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

  async addMusic(playlistId: number, musicId: number): Promise<Playlist> {
    return this.playlistRepository.addMusic(playlistId, musicId);
  }

  async deleteMusic(playlistId: number, musicId: number): Promise<Playlist> {
    return this.playlistRepository.deleteMusic(playlistId, musicId);
  }
}
