import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Music } from '../entities/music.entity';
import { CreateMusicDto } from '../dtos/create-music.dto';
import { UpdateMusicDto } from '../dtos/update-music.dto';

@Injectable()
export class MusicRepository {
  constructor(
    @InjectRepository(Music)
    private readonly musicRepository: Repository<Music>,
  ) {}

  async save(music: Music): Promise<Music> {
    return this.musicRepository.save(music);
  }

  async findAll(search?: string): Promise<Music[]> {
    const query = {};

    if (search) {
      Object.assign(query, {
        where: {
          name: Like(`%${search}%`),
        },
      });
    }
    return this.musicRepository.find(query);
  }

  async findOne(id: number): Promise<Music> {
    return this.musicRepository.findOne({
      where: { id },
    });
  }

  async remove(id: number): Promise<void> {
    await this.musicRepository.delete(id);
  }
}
