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
    private readonly playlistRepo: Repository<Playlist>,
    private readonly musicRepo: MusicRepository,
  ) {}

  async create(data: CreatePlaylistDto): Promise<Playlist> {
    const newPlaylist = new Playlist();
    newPlaylist.name = data.name;
    newPlaylist.description = data.description;

    if (data.musics && data.musics.length > 0) {
      const musicEntities = [];
      for (const musicDto of data.musics) {
        const newMusic = await this.musicRepo.create(musicDto);
        musicEntities.push(newMusic);
      }
      newPlaylist.musics = musicEntities;
    } else {
      newPlaylist.musics = [];
    }

    return this.playlistRepo.save(newPlaylist);
  }

  findAll(): Promise<Playlist[]> {
    return this.playlistRepo.find({ relations: ['musics'] });
  }

  findOne(id: number): Promise<Playlist> {
    return this.playlistRepo.findOne({
      where: { id },
      relations: ['musics'],
    });
  }

  async update(id: number, updatePlaylistDto: UpdatePlaylistDto): Promise<Playlist> {
    const updateData: Partial<Playlist> = {};
    if (updatePlaylistDto.name) updateData.name = updatePlaylistDto.name;
    if (updatePlaylistDto.description) updateData.description = updatePlaylistDto.description;

    if (updatePlaylistDto.musics) {
      const musicEntities = [];
      for (const musicDto of updatePlaylistDto.musics) {
        const newMusic = await this.musicRepo.create(musicDto);
        musicEntities.push(newMusic);
      }
      updateData.musics = musicEntities;
    }

    await this.playlistRepo.update(id, updateData);
    return this.playlistRepo.findOne({ where: { id }, relations: ['musics'] });
  }

  async delete(id: number): Promise<void> {
    await this.playlistRepo.delete(id);
  }
}
