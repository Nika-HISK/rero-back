import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Playlist } from '../entities/playlist.entity';
import { Repository } from 'typeorm';
import { CreatePlaylistDto } from '../dto/create-playlist.dto';
import { UpdatePlaylistDto } from '../dto/update-playlist.dto';
import { MusicRepository } from 'src/music/repositories/music.repository';

@Injectable()
export class PlaylistRepository {
  constructor(
    @InjectRepository(Playlist)
    private readonly playlistRepository: Repository<Playlist>,
    private readonly musicRepository: MusicRepository,
  ) {}

  async create(data: CreatePlaylistDto): Promise<Playlist> {
    const newPlaylist = await this.createPlaylistEntity(data);
    return this.playlistRepository.save(newPlaylist);
  }

  findAll(): Promise<Playlist[]> {
    return this.playlistRepository.find({ relations: ['musics'] });
  }

  findOne(id: number): Promise<Playlist> {
    return this.playlistRepository.findOne({
      where: { id },
      relations: ['musics'],
    });
  }

  async update(
    id: number,
    updatePlaylistDto: UpdatePlaylistDto,
  ): Promise<Playlist> {
    const updateData = await this.createPlaylistEntity(updatePlaylistDto);
    await this.playlistRepository.update(id, updateData);
    return this.playlistRepository.findOne({
      where: { id },
      relations: ['musics'],
    });
  }
  async delete(id: number): Promise<void> {
    await this.playlistRepository.delete(id);
  }
  private async createPlaylistEntity(
    data: CreatePlaylistDto | UpdatePlaylistDto,
  ): Promise<Playlist> {
    const playlist = new Playlist();
    playlist.name = data.name;
    playlist.description = data.description;

    if (data.musics && data.musics.length > 0) {
      const musicEntities = [];
      for (const musicDto of data.musics) {
        const newMusic = await this.musicRepository.create(musicDto);
        musicEntities.push(newMusic);
      }
      playlist.musics = musicEntities;
    } else {
      playlist.musics = [];
    }
    return playlist;
  }
}
