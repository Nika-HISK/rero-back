import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Listener } from '../entities/listener.entity';
import { CreateListenerDto } from '../dto/create-listener.dto';
import { MusicRepository } from 'src/music/repositories/music.repository';

@Injectable()
export class ListenersRepository {
  constructor(
    @InjectRepository(Listener)
    private readonly listenerRepo: Repository<Listener>,
    private readonly musicRepo:MusicRepository
  ) {}

  async getStatistics(): Promise<any[]> {
    const rawData = await this.listenerRepo
      .createQueryBuilder('listener')
      .select('listener.musicId', 'musicId')
      .addSelect('COUNT(listener.id)', 'listenCount')
      .addSelect('music.id', 'musicId')
      .addSelect('music.name', 'musicName')
      .addSelect('music.musicAudio', 'musicAudio')
      .addSelect('music.coverImage', 'musicCoverImage')
      .addSelect('music.duration', 'musicDuration')
      .addSelect('album.id', 'albumId')
      .addSelect('album.name', 'albumName')
      .addSelect('album.releaseDate', 'albumReleaseDate')
      .addSelect('album.cover', 'albumCover')
      .addSelect('artist.id', 'artistId')
      .addSelect('artist.artistName', 'artistName')
      .addSelect('artist.artistPhoto', 'artistPhoto')
      .addSelect('artist.biography', 'artistBiography')
      .leftJoin('listener.music', 'music')
      .leftJoin('music.artist', 'artist')
      .leftJoin('music.album', 'album')
      .groupBy('listener.musicId')
      .orderBy('listenCount', 'DESC')
      .getRawMany();
  
    return rawData.map(row => ({
      id: row.musicId,
      name: row.musicName,
      musicAudio: row.musicAudio,
      coverImage: row.musicCoverImage,
      duration: row.musicDuration,
      albumId: row.albumId,
      artistId: row.artistId,
      artist: {
        id: row.artistId,
        artistName: row.artistName,
        artistPhoto: row.artistPhoto,
        biography: row.artistBiography,
        deletedAt: null, 
      },
      album: row.albumId ? {
        id: row.albumId,
        name: row.albumName,
        releaseDate: row.albumReleaseDate,
        cover: row.albumCover,
        artistId: row.artistId,
        deletedAt: null, 
      } : null
    }));
  }
  

  async addListener(musicId: number): Promise<void> {
    const listener = new Listener();
    listener.musicId = musicId; 
    await this.listenerRepo.save(listener);
  }


  async create(musicId:number) {    
    const music = await this.musicRepo.findOne(musicId);
    if (!music) {
      throw new NotFoundException('Music not found');
    }

    const listener = this.listenerRepo.create({ music });
    return this.listenerRepo.save(listener);
  }  
}
