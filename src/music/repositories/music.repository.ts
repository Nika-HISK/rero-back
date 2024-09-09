import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
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
    const sql = this.musicRepository.createQueryBuilder('music')
    .leftJoinAndSelect('music.artist', 'artist')

    if (search) {
        sql.where ('music.name LIKE :search', {search})

    }
    const raghaca = await sql.getMany()
    return raghaca
  }

  async findOneByProperties(
    createMusicDto: CreateMusicDto,
  ): Promise<Music | null> {
    return this.musicRepository.findOne({
      where: {
        name: createMusicDto.name,
        url: createMusicDto.url,
        artist: { id: createMusicDto.artistId },
      },
    });
  }

  async findOne(id: number): Promise<Music> {
    return this.musicRepository.findOneBy({ id });
  }

  async update(id: number, updateMusicDto: UpdateMusicDto): Promise<Music> {
    await this.musicRepository.update(id, updateMusicDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.musicRepository.delete(id);
  }
}
