import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Playlist } from '../entities/playlist.entity';
import { CreatePlaylistDto } from '../dto/create-playlist.dto';
import { UpdatePlaylistDto } from '../dto/update-playlist.dto';
import { Music } from 'src/music/entities/music.entity';
import { MusicRepository } from 'src/music/repositories/music.repository';
import { error } from 'console';

@Injectable()
export class PlaylistRepository {
  constructor(
    @InjectRepository(Playlist)
    private readonly playlistRepository: Repository<Playlist>,
    private readonly musicrepository: MusicRepository,

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
      .where('playlist.id = :id', { id })
      .getOne();
  
    return playlist;
  }

  async addMusic (id:number, musicId:number) {
    const playlist = await this.playlistRepository.findOne({where :{id}, relations: ['musics']})

    if(musicId) {
    const music = await this.musicrepository.findOne(musicId)

    const hasMusic = playlist.musics.some(m => m.id == musicId);

    if(!hasMusic) playlist.musics.push(music)
    else throw new Error('Music is already exists');

    return this.playlistRepository.save(playlist)      

  } else {
    throw new UnauthorizedException()
  }

  }


  async deleteMusic (id:number, musicId:number) {
    // const playlist = await this.playlistRepository.findOne({where :{id}, relations: ['musics']})
    // const music = await this.musicrepository.findOne(musicId)
    // if(playlist && music) {
    //   let updatedPlaylist = playlist.musics.filter(m => m.id !== musicId);
    //   return this.playlistRepository.save(updatedPlaylist);
    // }

    // const specificPlaylist = await this.playlistRepository.findOne({where: {id: id}});
    // const specificMusic = await this.playlistRepository.find({where: {id: id}});
    // if(specificPlaylist) {
    //   if(specificMusic) {
        
    //   }
    //   throw new Error('Music could not be found');

    // }
    // else {
    //   throw new Error('Playlist could not be found');
    // }
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
