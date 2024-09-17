import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Playlist } from '../entities/playlist.entity';
import { CreatePlaylistDto } from '../dto/create-playlist.dto';
import { UpdatePlaylistDto } from '../dto/update-playlist.dto';
import { Music } from 'src/music/entities/music.entity';

@Injectable()
export class PlaylistRepository {
  constructor(
    @InjectRepository(Playlist)
    private readonly playlistRepository: Repository<Playlist>,
  ) {}

  async createPlaylist(
    createPlaylistDto: CreatePlaylistDto,
    musics: Music[] = [],
  ): Promise<Playlist> {
    const newPlaylist = this.playlistRepository.create({
      playlistName: createPlaylistDto.playlistName,
      musics: musics,
    });
    return await this.playlistRepository.save(newPlaylist);
  }

  async findAll(): Promise<Playlist[]> {
    return await this.playlistRepository.createQueryBuilder('playlist')
    .leftJoinAndSelect('playlist.musics', 'music')
    .leftJoinAndSelect('music.artist', 'artist')
    .getMany()

  }

  async findOne(id: number): Promise<Playlist> {
    const playlist = await this.playlistRepository.createQueryBuilder('playlist')
    .leftJoinAndSelect('playlist.musics', 'music')
    .leftJoinAndSelect('music.artist', 'artist')
    .where('artist.id = :id', { id })
    .getOne()

    return playlist
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
