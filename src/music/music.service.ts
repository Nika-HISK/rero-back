import { Injectable } from '@nestjs/common';
import { CreateMusicDto } from './dtos/create-music.dto';
import { UpdateMusicDto } from './dtos/update-music.dto';

@Injectable()
export class MusicService {
  constructor(private readonly musicService: MusicService) {}

  create(data: CreateMusicDto) {
    return this.musicService.create(data);
  }
  update(id: number, data: object) {
    return this.musicService.update(id, UpdateMusicDto);
  }
  findAll() {
    return this.musicService.findAll();
  }
  findOne(id: number) {
    return this.musicService.findOne(id);
  }
  remove(id: number) {
    return this.musicService.remove(id);
  }
}
