import { Injectable } from '@nestjs/common';
import { MusicRepository } from './repositories/music.repository';
import { CreateMusicDto } from './dtos/create-music.dto';
import { Music } from './entities/music.entity';
import { UpdateMusicDto } from './dtos/update-music.dto';

@Injectable()
export class MusicService {
  constructor(private readonly musicRepository: MusicRepository) {}

  async create(
    createMusicDto: CreateMusicDto,
    duration?: string,
  ): Promise<Music> {
    return this.musicRepository.create(createMusicDto, duration);
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
