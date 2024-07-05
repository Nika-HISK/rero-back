import { Injectable } from '@nestjs/common';
import { CreateMusicDto } from './dtos/create-music.dto';
import { UpdateMusicDto } from './dtos/update-music.dto';

@Injectable()
export class MusicService {
  create(data: CreateMusicDto) {}
  update(id: number, data: UpdateMusicDto) {}
  findAll() {}
  findOne(id: number) {}
  remove(id: number) {}
}
