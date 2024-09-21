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
      .select('chart.id', 'musicId') 
      .addSelect('COUNT(topchart.id)', 'topchartCount')
      .addSelect('chart.name', 'musicName')
      .addSelect('chart.musicAudio', 'musicAudio')
      .addSelect('chart.coverImage', 'musicCoverImage')
      .addSelect('chart.duration', 'musicDuration')
      .addSelect('album.id', 'albumId')
      .addSelect('album.name', 'albumName')
      .addSelect('album.releaseDate', 'albumReleaseDate')
      .addSelect('album.cover', 'albumCover')
      .addSelect('artist.id', 'artistId')
      .addSelect('artist.artistName', 'artistName')
      .addSelect('artist.artistPhoto', 'artistPhoto')
      .addSelect('artist.biography', 'artistBiography')
      .leftJoin('topchart.chart', 'chart')  
      .leftJoin('chart.artist', 'artist')
      .leftJoin('chart.album', 'album')
      .groupBy('chart.id')  
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
    const chart = await this.topChartRepo.manager.findOne(Chart, { where: { id: chartId } });
  
    if (!chart) {
      throw new Error(`Chart with id ${chartId} not found`);
    }
  
    const topchart = new Topchart();
    topchart.chart = chart;  
  
    return this.topChartRepo.save(topchart);
  }
  

}