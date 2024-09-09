import { Injectable } from '@nestjs/common';
import { CreateMusicDto } from './dtos/create-music.dto';
import { UpdateMusicDto } from './dtos/update-music.dto';
import { Music } from './entities/music.entity';
import { MusicRepository } from './repositories/music.repository';

@Injectable()
export class MusicService {
  constructor(private readonly musicRepository: MusicRepository) {}

  async create(createMusicDto: CreateMusicDto): Promise<Music> {
    let music = await this.musicRepository.findOneByProperties(createMusicDto);

    if (!music) {
      music = await this.musicRepository.create(createMusicDto);
    }

    return music;
  }

  async findAll(search?: string): Promise<Music[]> {
    return this.musicRepository.findAll(search);
  }

  async findOne(id: number): Promise<Music> {
    return this.musicRepository.findOne(id);
  }

  async update(id: number, updateMusicDto: UpdateMusicDto): Promise<Music> {
    let music = await this.musicRepository.findOne(id);
    if (!music) {
      throw new Error('Music not found');
    }

    return this.musicRepository.update(id, updateMusicDto);
  }

  async findByProperties(
    createMusicDto: CreateMusicDto,
  ): Promise<Music | null> {
    return this.musicRepository.findOneByProperties(createMusicDto);
  }

  async remove(id: number): Promise<void> {
    await this.musicRepository.remove(id);
  }
}
