import { Injectable } from '@nestjs/common';
import { MusicRepository } from './repositories/music.repository';
import { Music } from './entities/music.entity';
import { CreateMusicDto } from './dtos/create-music.dto';
import { UpdateMusicDto } from './dtos/update-music.dto';

@Injectable()
export class MusicService {
  constructor(private readonly musicRepository: MusicRepository) {}

  async create(createMusicDto: CreateMusicDto): Promise<Music> {
    return this.musicRepository.create(createMusicDto);
  }

  async findAll(search?: string): Promise<Music[]> {
    return this.musicRepository.findAll(search);
  }

  async findOne(id: number): Promise<Music> {
    return this.musicRepository.findOne(id);
  }

  async update(id: number, updateMusicDto: UpdateMusicDto): Promise<Music> {
    return this.musicRepository.update(id, updateMusicDto);
  }

  async findByProperties(
    createMusicDto: CreateMusicDto,
  ): Promise<Music | null> {
    return this.musicRepository.findByProperties(createMusicDto);
  }

  async remove(id: number): Promise<void> {
    await this.musicRepository.remove(id);
  }
}
