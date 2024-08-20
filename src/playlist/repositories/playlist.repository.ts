import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Playlist } from '../entities/playlist.entity';
import { Repository } from 'typeorm';
import { CreatePlaylistDto } from '../dto/create-playlist.dto';
import { UpdatePlaylistDto } from '../dto/update-playlist.dto';

@Injectable()
export class PlaylistRepository {
  constructor(
    @InjectRepository(Playlist)
    private readonly playlistRepository: Repository<Playlist>,
  ) {}

  async create(data: CreatePlaylistDto): Promise<Playlist> {
    const newPlaylist = new Playlist();
    newPlaylist.name = data.name;
    newPlaylist.description = data.description;
    newPlaylist.musics = [];

    return await this.playlistRepository.save(newPlaylist);
  }

  async findAll(): Promise<Playlist[]> {
    return await this.playlistRepository.find({ relations: ['musics'] });
  }

  async findOne(id: number): Promise<Playlist> {
    return await this.playlistRepository.findOne({
      where: { id },
      relations: ['musics'],
    });
  }

  async update(
    id: number,
    updatePlaylistDto: UpdatePlaylistDto,
  ): Promise<Playlist> {
    await this.playlistRepository.update(id, updatePlaylistDto);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.playlistRepository.delete(id);
  }
}
