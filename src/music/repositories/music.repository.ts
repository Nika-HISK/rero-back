import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Music } from '../entities/music.entity';
import { Like, Repository } from 'typeorm';
import { CreateMusicDto } from '../dtos/create-music.dto';
import { UpdateMusicDto } from '../dtos/update-music.dto';


@Injectable()
export class MusicRepository {
  constructor(
    @InjectRepository(Music)
    private readonly musicRepository: Repository<Music>,
  ) { }

  create(data: CreateMusicDto) {
    const newMusic = new Music();

    newMusic.name = data.name;
    newMusic.url = data.url;

    return this.musicRepository.save(newMusic);
  }

  findAll(search?: string) {
    const query = {}

    if (search) {
      Object.assign(query, {
        where: {
          title: Like(`%${search}%`)
        }
      })
    }
    return this.musicRepository.find(query)
  }

  findOne(id: number) {
    return this.musicRepository.findOneBy({ id });
  }

  update(id: number, updateMusicDto: UpdateMusicDto) {
    return `updates ${updateMusicDto} on id ${id}`;
  }

  remove(id: number) {
    return this.musicRepository.delete(id);
  }
}
