import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Playlist } from './entities/playlist.entity';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { MusicService } from 'src/music/music.service';
import { Music } from 'src/music/entities/music.entity';

@Injectable()
export class PlaylistService {
  constructor(
    @InjectRepository(Playlist)
    private readonly playlistRepository: Repository<Playlist>,
    private readonly musicService: MusicService,
  ) {}

  async create(createPlaylistDto: CreatePlaylistDto): Promise<Playlist> {
    const playlist = new Playlist();
    playlist.name = createPlaylistDto.name;
    playlist.description = createPlaylistDto.description;

    if (createPlaylistDto.musics && createPlaylistDto.musics.length > 0) {
      const musicEntities: Music[] = [];
      for (const musicDto of createPlaylistDto.musics) {
        const music = await this.musicService.create(musicDto);
        musicEntities.push(music);
      }
      playlist.musics = musicEntities;
    } else {
      playlist.musics = [];
    }

    return await this.playlistRepository.save(playlist);
  }

  async update(
    id: number,
    updatePlaylistDto: UpdatePlaylistDto,
  ): Promise<Playlist> {
    const playlist = await this.playlistRepository.findOne({
      where: { id },
      relations: ['musics'],
    });
    if (!playlist) {
      throw new Error('Playlist not found');
    }

    if (updatePlaylistDto.name) {
      playlist.name = updatePlaylistDto.name;
    }
    if (updatePlaylistDto.description) {
      playlist.description = updatePlaylistDto.description;
    }

    if (updatePlaylistDto.musics && updatePlaylistDto.musics.length > 0) {
      const musicEntities: Music[] = [];
      for (const musicDto of updatePlaylistDto.musics) {
        const music = await this.musicService.create(musicDto);
        musicEntities.push(music);
      }
      playlist.musics = musicEntities;
    }

    return await this.playlistRepository.save(playlist);
  }

  async findAll(): Promise<Playlist[]> {
    return this.playlistRepository.find({ relations: ['musics'] });
  }

  async findOne(id: number): Promise<Playlist> {
    return this.playlistRepository.findOne({
      where: { id },
      relations: ['musics'],
    });
  }

  async delete(id: number): Promise<void> {
    await this.playlistRepository.delete(id);
  }
}
