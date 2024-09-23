import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Chart } from "../entities/chart.entity";
import { Repository } from "typeorm";
import { CreateChartDto } from "../dto/create-chart.dto";
import { UpdateChartDto } from "../dto/update-chart.dto";
import { TopchartsRepostitory } from "src/topcharts/repositories/topcharts.respository";



@Injectable()
export class ChartRepository {
    constructor(
        @InjectRepository(Chart)
        private readonly chartRepo:Repository<Chart>,
        private readonly topChartRepo:TopchartsRepostitory
    ) {}

    async create(data: CreateChartDto, duration?: string): Promise<Chart> {
        const newMusic = this.chartRepo.create({
          ...data,
          duration: duration || null,
        });
        console.log('Repository saving music with duration:', duration);
        return this.chartRepo.save(newMusic);
      }
    
      async findAll(search?: string): Promise<Chart[]> {
        const query = this.chartRepo
          .createQueryBuilder('music')
          .leftJoinAndSelect('music.artist', 'artist')
          .leftJoinAndSelect('music.album', 'album')
    
        if (search) {
          query.where('music.name LIKE :search', { search: `%${search}%` });
        }
    
        return await query.getMany();
      }
    
    
    
      async findOne(id: number): Promise<Chart | null> {
        
       await this.topChartRepo.addListener(id)

        return this.chartRepo.findOne({
          where: { id },
          relations: ['artist', 'album'],
        })
      }
    
      async findByProperties(
        createChartDto: CreateChartDto,
      ): Promise<Chart | null> {
        return this.chartRepo.findOne({
          where: {
            name: createChartDto.name,
            musicAudio: createChartDto.musicAudio,
            artist: { id: createChartDto.artistId },
          },
          relations: ['artist'],
        });
      }
    
      async update(id: number, updateChartDto: UpdateChartDto): Promise<Chart> {
        await this.chartRepo.update(id, updateChartDto);
        return this.findOne(id);
      }
      
      async remove(id: number): Promise<void> {
        await this.chartRepo.delete(id);
      }
      async findShuffledArray() {
        const musicListWithArtists = await this.chartRepo
          .createQueryBuilder('music')
          .leftJoinAndSelect('music.artist', 'artist')
          .getMany();
      
        return this.shuffleArray(musicListWithArtists);
      }
      
      private shuffleArray(array: any[]): any[] {
        return array.sort(() => Math.random() - 0.5);
      }
    
}