import { Injectable } from '@nestjs/common';
import { MusicRepository } from './repositories/music.repository';
import { Music } from './entities/music.entity';
import { CreateMusicDto } from './dtos/create-music.dto';
import { UpdateMusicDto } from './dtos/update-music.dto';

@Injectable()
export class MusicService {
  constructor(private readonly musicRepository: MusicRepository) {}

  async create(createMusicDto: CreateMusicDto): Promise<Music> {
    const music = new Music();
    music.name = createMusicDto.name;
    music.url = createMusicDto.url;

    return this.musicRepository.save(music);
  }

  async findAll(search?: string): Promise<Music[]> {
    return this.musicRepository.findAll(search);
  }

  async findOne(id: number): Promise<Music> {
    return this.musicRepository.findOne(id);
  }

  async update(id: number, updateMusicDto: UpdateMusicDto): Promise<Music> {
    const music = await this.musicRepository.findOne(id);
    if (!music) {
      throw new Error('Music not found');
    }

    if (updateMusicDto.name) {
      music.name = updateMusicDto.name;
    }
    if (updateMusicDto.url) {
      music.url = updateMusicDto.url;
    }

    return this.musicRepository.save(music);
  }

  async remove(id: number): Promise<void> {
    await this.musicRepository.remove(id);
  }
}
