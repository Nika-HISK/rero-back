import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Playlist } from '../entities/playlist.entity';
import { Repository } from 'typeorm';
import { CreatePlaylistDto } from '../dto/create-playlist.dto';
import { UpdatePlaylistDto } from '../dto/update-playlist.dto';
import { Music } from 'src/music/entities/music.entity';
import { CreateMusicDto } from 'src/music/dtos/create-music.dto';

@Injectable()
export class PlaylistRepository {
  constructor(
    @InjectRepository(Playlist)
    private readonly playlistRepo: Repository<Playlist>,

    @InjectRepository(Music)
    private readonly musicRepo: Repository<Music>,
  ) {}

  async create(data: CreatePlaylistDto): Promise<Playlist> {
    const newPlaylist = new Playlist();
    newPlaylist.name = data.name;
    newPlaylist.description = data.description;

    if (data.musics && data.musics.length > 0) {
      const musicEntities = await Promise.all(
        data.musics.map(async (musicDto: CreateMusicDto) => {
          const newMusic = this.musicRepo.create(musicDto);
          return this.musicRepo.save(newMusic);
        }),
      );
      newPlaylist.music = musicEntities;
    } else {
      newPlaylist.music = [];
    }

    return this.playlistRepo.save(newPlaylist);
  }

  findAll(): Promise<Playlist[]> {
    return this.playlistRepo.find({ relations: ['music'] });
  }

  findOne(id: number): Promise<Playlist> {
    return this.playlistRepo.findOne({
      where: { id },
      relations: ['music'],
    });
  }

  async update(
    id: number,
    updatePlaylistDto: UpdatePlaylistDto,
  ): Promise<Playlist> {
    const playlist = await this.playlistRepo.findOne({
      where: { id },
      relations: ['music'],
    });
    if (!playlist) {
      throw new Error('Playlist not found');
    }

    playlist.name = updatePlaylistDto.name || playlist.name;
    playlist.description =
      updatePlaylistDto.description || playlist.description;

    if (updatePlaylistDto.musics) {
      const updatedMusicEntities = await Promise.all(
        updatePlaylistDto.musics.map(async (musicDto: CreateMusicDto) => {
          const newMusic = this.musicRepo.create(musicDto);
          return this.musicRepo.save(newMusic);
        }),
      );
      playlist.music = updatedMusicEntities;
    }

    return this.playlistRepo.save(playlist);
  }

  delete(id: number): Promise<void> {
    return this.playlistRepo.delete(id).then(() => undefined);
  }
}
