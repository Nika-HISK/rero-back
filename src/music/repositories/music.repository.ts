import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
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

  async create(data: CreateMusicDto): Promise<Music> {
    const newMusic = this.musicRepository.create(data);
    return await this.musicRepository.save(newMusic);
  }

  async findAll(search?: string): Promise<Music[]> {
    const options = search ? 
      { where: { name: Like(`%${search}%`) } } :
      {};
    return await this.musicRepository.find(options);
  }

  async findOneByProperties(createMusicDto: CreateMusicDto): Promise<Music | null> {
    const { name, artistId } = createMusicDto;
    return await this.musicRepository.findOne({
      where: {
        name,
        artist: { id: artistId },
      },
      relations: ['artist'],
    });
  }

  async findOne(id: number): Promise<Music> {
    const music = await this.musicRepository.findOne({
      where: { id },
      relations: ['artist', 'album'],
    });

    if (!music) {
      throw new NotFoundException(`Music with ID ${id} not found`);
    }

    return music;
  }

  async update(id: number, updateMusicDto: UpdateMusicDto): Promise<Music> {
    const result = await this.musicRepository.update(id, updateMusicDto);

    if (result.affected === 0) {
      throw new NotFoundException(`Music with ID ${id} not found`);
    }

    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const music = await this.findOne(id);

    if (music.album) {
      throw new BadRequestException('Cannot delete music record as it is associated with an album.');
    }

    await this.musicRepository.delete(id);
  }
}
