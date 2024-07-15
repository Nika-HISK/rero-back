import { Injectable } from '@nestjs/common';
import { CreateMusicDto } from './dtos/create-music.dto';
import { UpdateMusicDto } from './dtos/update-music.dto';
import { MusicRepository } from './repositories/music.repository';

@Injectable()
export class MusicService {
  constructor(private readonly musicRepository: MusicRepository) { }

  create(data: CreateMusicDto) {
    return this.musicRepository.create(data);
  }

  findAll() {
    return this.musicRepository.findAll();
  }
  findOne(id: number) {
    return this.musicRepository.findOne(id);
  }

  update(id: number, data: UpdateMusicDto) {
    return this.musicRepository.update(id, data);
  }

  remove(id: number) {
    return this.musicRepository.remove(id);
  }
}
