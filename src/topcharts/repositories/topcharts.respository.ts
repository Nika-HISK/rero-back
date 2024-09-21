import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Chart } from "src/chart/entities/chart.entity";
import { Repository } from "typeorm";
import { Topchart } from "../entities/topchart.entity";



@Injectable()

export class TopchartsRepostitory {

  constructor(
    @InjectRepository(Topchart)
    private readonly topChartRepo: Repository<Topchart>,
  ) {}

  async getStatistics(): Promise<any[]> {
    const rawData = await this.topChartRepo
      .createQueryBuilder('topchart')
      .select('topchart.musicId', 'musicId')
      .addSelect('COUNT(topchart.id)', 'topchartCount')
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
      .leftJoin('topchart.chart', 'chart')  
      .leftJoin('chart.music', 'music')     
      .leftJoin('chart.artist', 'artist')
      .leftJoin('chart.album', 'album')
      .groupBy('topchart.musicId')
      .orderBy('topchartCount', 'DESC') 
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
  
  

  async addListener(chartId: number): Promise<Topchart> {
    const topchart = new Topchart();
  
    topchart.chart = new Chart(); 
    topchart.chart.id = chartId; 
    
    return this.topChartRepo.save(topchart);
  }

}