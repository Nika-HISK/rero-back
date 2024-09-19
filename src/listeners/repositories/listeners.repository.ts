import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Listener } from '../entities/listener.entity';

@Injectable()
export class ListenersRepository {
  constructor(
    @InjectRepository(Listener)
    private readonly listenerRepo: Repository<Listener>,
  ) {}

  async getStatistics(): Promise<any[]> {
    return this.listenerRepo
      .createQueryBuilder('listener')
      .select('listener.musicId', 'musicId')
      .addSelect('COUNT(listener.id)', 'listenCount')
      .addSelect('music.name', 'name')
      .addSelect('music.musicAudio', 'musicAudio')
      .addSelect('music.coverImage', 'coverImage')
      .addSelect('music.duration', 'duration')
      .addSelect('music.albumId', 'albumId')
      .addSelect('music.artistId', 'artistId')
      .addSelect('artist.artistName', 'artistName')
      .addSelect('artist.artistPhoto', 'artistPhoto')
      .addSelect('artist.biography', 'artistBiography')
      .leftJoin('listener.music', 'music')
      .leftJoin('music.artist', 'artist')
      .groupBy('listener.musicId')
      .orderBy('listenCount', 'DESC')
      .getRawMany();
  }
  

  async addListener(musicId: number): Promise<void> {
    const listener = new Listener();
    listener.musicId = musicId; 
    await this.listenerRepo.save(listener);
  }
}


