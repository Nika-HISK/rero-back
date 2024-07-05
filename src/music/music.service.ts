import { Injectable } from '@nestjs/common';
import { CreateMusicDto } from './dtos/create-music.dto';
import { UpdateMusicDto } from './dtos/update-music.dto';

@Injectable()
export class MusicRepository {
  constructor(private readonly musicRepository: MusicRepository) {}

  create(data: CreateMusicDto) {
    return this.musicRepository.create(data);
  }
  update(id: number, data: object) {
    return this.musicRepository.update(id, UpdateMusicDto);
  }
  findAll() {
    return this.musicRepository.findAll();
  }
  findOne(id: number) {
    return this.musicRepository.findOne(id);
  }
  remove(id: number) {
    return this.musicRepository.remove(id);
  }
}
