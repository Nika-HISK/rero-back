import { CreateChartDto } from './dto/create-chart.dto';
import { UpdateChartDto } from './dto/update-chart.dto';
import { ChartRepository } from './repositories/chart.respository';
import { Chart } from './entities/chart.entity';
import { join } from 'path';

import { Injectable } from '@nestjs/common';
import { FilesService } from 'src/files/files.service';
import { promises as fs } from 'fs';
import * as os from 'os';

const ffmpeg = require('fluent-ffmpeg');
const ffprobePath = require('@ffprobe-installer/ffprobe').path;
ffmpeg.setFfprobePath(ffprobePath);

@Injectable()
export class ChartService {

  constructor(
    private readonly chartRepository: ChartRepository,
    private readonly filesService: FilesService,
  ) {}

  async create(
    createChartDto: CreateChartDto,
    musicAudioFile: Express.Multer.File,
    coverImageFile?: Express.Multer.File[],
  ): Promise<Chart> {
    let duration: number | undefined;

    const tempFilePath = join(os.tmpdir(), musicAudioFile.originalname);
    await fs.writeFile(tempFilePath, musicAudioFile.buffer);

    try {
      duration = await new Promise<number>((resolve, reject) => {
        ffmpeg.ffprobe(tempFilePath, (err, metadata) => {
          if (err) {
            return reject(err);
          }
          resolve(metadata.format.duration);
        });
      });

      const uploadedAudio = await this.filesService.uploadFile(musicAudioFile);
      createChartDto.musicAudio = uploadedAudio.url;
    } finally {
      await fs.unlink(tempFilePath);
    }

    if (coverImageFile && coverImageFile[0]) {
      const uploadedCover = await this.filesService.uploadFile(
        coverImageFile[0],
      );
      createChartDto.coverImage = uploadedCover.url;
    }

    const durationString = duration ? this.formatDuration(duration) : undefined;

    return this.chartRepository.create(createChartDto, durationString);
  }

  private formatDuration(durationInSeconds: number): string {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = Math.floor(durationInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  async findAll(search?: string): Promise<Partial<Chart>[]> {
    const musicList = await this.chartRepository.findAll(search);
    return musicList.map(({ albumId, artistId, ...music }) => music);
  }

  async findOne(id: number): Promise<Partial<Chart> | null> {
    const music = await this.chartRepository.findOne(id);
    if (music) {
      const { albumId, artistId, ...musicWithoutIds } = music;
      return musicWithoutIds;
    }

    return null;
  }

  async update(id: number, updateChartDto: UpdateChartDto): Promise<Chart> {
    return this.chartRepository.update(id, updateChartDto);
  }

  async remove(id: number): Promise<void> {
    return this.chartRepository.remove(id);
  }

  async findByProperties(
    createChartDto: CreateChartDto,
  ): Promise<Chart | null> {
    return this.chartRepository.findByProperties(createChartDto);
  }
}
