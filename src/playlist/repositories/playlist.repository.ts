import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Playlist } from '../entities/playlist.entity';
import { CreatePlaylistDto } from '../dto/create-playlist.dto';
import { UpdatePlaylistDto } from '../dto/update-playlist.dto';
import { Music } from 'src/music/entities/music.entity';
import { MusicRepository } from 'src/music/repositories/music.repository';

@Injectable()
export class PlaylistRepository {
  constructor(
    @InjectRepository(Playlist)
    private readonly playlistRepository: Repository<Playlist>,
    private readonly musicrepository: MusicRepository,

    ) {}

    async createPlaylist(
      createPlaylistDto: CreatePlaylistDto,
      userId: number,
    ): Promise<Playlist> {
      const newPlaylist = this.playlistRepository.create({
        playlistName: createPlaylistDto.playlistName,
        musics: createPlaylistDto.musics || [],
        user: { id: userId },
      });
      return await this.playlistRepository.save(newPlaylist);
    }


  async findAll(): Promise<Playlist[]> {
    return await this.playlistRepository.createQueryBuilder('playlist')
    .leftJoinAndSelect('playlist.musics', 'music')
    .leftJoinAndSelect('music.artist', 'artist')
    .leftJoinAndSelect('playlist.user', 'user')
    .leftJoinAndSelect('music.album', 'album')
    .getMany()
  }

  async findOne(id: number): Promise<Playlist> {
    const playlist = await this.playlistRepository.createQueryBuilder('playlist')
      .leftJoinAndSelect('playlist.musics', 'music')
      .leftJoinAndSelect('music.artist', 'artist')
      .where('playlist.id = :id', { id })
      .getOne();
  
    return playlist;
  }

  
  async addMusic(id: number, musicId: number): Promise<Playlist> {
    const playlist = await this.playlistRepository.findOne({
      where: { id },
      relations: ['musics'],
    });
  
    const music = await this.musicrepository.findOne(musicId);
  
    if (!playlist) {
      throw new Error('Playlist not found');
    }
    
    if (!music) {
      throw new Error('Music not found');
    }
  
    const hasMusic = playlist.musics.some(m => m.id === musicId);
    
    if (!hasMusic) {
      playlist.musics.push(music);
      return await this.playlistRepository.save(playlist);
    } else {
      throw new Error('Music already exists in the playlist');
    }
  }

  async deleteMusic(id: number, musicId: number): Promise<Playlist> {
    const playlist = await this.playlistRepository.findOne({
      where: { id },
      relations: ['musics'],
    });
  
    if (!playlist) {
      throw new Error('Playlist not found');
    }
  
    const music = playlist.musics.find(m => m.id === musicId);
  
    if (!music) {
      throw new Error('Music not found in the playlist');
    }
  
    playlist.musics = playlist.musics.filter(m => m.id !== musicId);
  
    return await this.playlistRepository.save(playlist);
  }

  async update(
    id: number,
    updatePlaylistDto: UpdatePlaylistDto,
    musics: Music[] = [],
  ): Promise<Playlist> {
    const existingPlaylist = await this.findOne(id);
    if (!existingPlaylist) {
      throw new Error('Playlist not found');
    }

    const updatedPlaylist = {
      ...existingPlaylist,
      playlistName: updatePlaylistDto.playlistName ?? existingPlaylist.playlistName,

      musics: musics.length > 0 ? musics : existingPlaylist.musics,
    };

    return await this.playlistRepository.save(updatedPlaylist);
  }

  async delete(id: number): Promise<void> {
    await this.playlistRepository.delete(id);
  }
}
