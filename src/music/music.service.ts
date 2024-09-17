import { Injectable } from '@nestjs/common';
import { MusicRepository } from './repositories/music.repository';
import { CreateMusicDto } from './dtos/create-music.dto';
import { Music } from './entities/music.entity';
import { UpdateMusicDto } from './dtos/update-music.dto';
import { FilesService } from 'src/files/files.service';
import { promises as fs } from 'fs';
import { join } from 'path';
import * as os from 'os';

const ffmpeg = require('fluent-ffmpeg');
const ffprobePath = require('@ffprobe-installer/ffprobe').path;
ffmpeg.setFfprobePath(ffprobePath);

@Injectable()
export class MusicService {
  constructor(
    private readonly musicRepository: MusicRepository,
    private readonly filesService: FilesService,
  ) {}

  async create(
    createMusicDto: CreateMusicDto,
    musicAudioFile: Express.Multer.File,
    coverImageFile?: Express.Multer.File[],
  ): Promise<Music> {
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
      createMusicDto.musicAudio = uploadedAudio.url;
    } finally {
      await fs.unlink(tempFilePath);
    }

    if (coverImageFile && coverImageFile[0]) {
      const uploadedCover = await this.filesService.uploadFile(
        coverImageFile[0],
      );
      createMusicDto.coverImage = uploadedCover.url;
    }

    const durationString = duration ? this.formatDuration(duration) : undefined;

    return this.musicRepository.create(createMusicDto, durationString);
  }

  private formatDuration(durationInSeconds: number): string {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = Math.floor(durationInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  async findAll(search?: string): Promise<Music[]> {
    return this.musicRepository.findAll(search);
  }

  async findOne(id: number): Promise<Music | null> {
    return this.musicRepository.findOne(id);
  }

  async update(id: number, updateMusicDto: UpdateMusicDto): Promise<Music> {
    return this.musicRepository.update(id, updateMusicDto);
  }

  async remove(id: number): Promise<void> {
    return this.musicRepository.remove(id);
  }

  async findByProperties(
    createMusicDto: CreateMusicDto,
  ): Promise<Music | null> {
    return this.musicRepository.findByProperties(createMusicDto);
  }
}
