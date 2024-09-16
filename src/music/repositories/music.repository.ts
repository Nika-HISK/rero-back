import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Music } from '../entities/music.entity';
import { CreateMusicDto } from '../dtos/create-music.dto';
import { UpdateMusicDto } from '../dtos/update-music.dto';

@Injectable()
export class MusicRepository {
  constructor(
    @InjectRepository(Music)
    private readonly musicRepository: Repository<Music>,
  ) {}

  async create(data: CreateMusicDto, duration?: string): Promise<Music> {
    const newMusic = this.musicRepository.create({
      ...data,
      duration: duration || null,
    });
    console.log('Repository saving music with duration:', duration);
    return this.musicRepository.save(newMusic);
  }

  async findAll(search?: string): Promise<Music[]> {
    const query = this.musicRepository
      .createQueryBuilder('music')
      .leftJoinAndSelect('music.artist', 'artist');

    if (search) {
      query.where('music.name LIKE :search', { search: `%${search}%` });
    }

    return await query.getMany();
  }

  async findOne(id: number): Promise<Music | null> {
    return this.musicRepository.findOne({
      where: { id },
      relations: ['artist'],
    });
  }

  async findByProperties(
    createMusicDto: CreateMusicDto,
  ): Promise<Music | null> {
    return this.musicRepository.findOne({
      where: {
        name: createMusicDto.name,
        musicAudio: createMusicDto.musicAudio,
        artist: { id: createMusicDto.artistId },
      },
      relations: ['artist'],
    });
  }

  async update(id: number, updateMusicDto: UpdateMusicDto): Promise<Music> {
    await this.musicRepository.update(id, updateMusicDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.musicRepository.delete(id);
  }
  async findShuffledArray() {
    const musicListWithArtists = await this.musicRepository
      .createQueryBuilder('music')
      .leftJoinAndSelect('music.artist', 'artist')
      .getMany();
  
    return this.shuffleArray(musicListWithArtists);
  }
  
  private shuffleArray(array: any[]): any[] {
    return array.sort(() => Math.random() - 0.5);
  }
}
