import { Injectable } from '@nestjs/common';
import { CreateMusicDto } from './dtos/create-music.dto';
import { UpdateMusicDto } from './dtos/update-music.dto';
import { MusicRepository } from './repositories/music.repository';
import { SearchQueryDto } from 'src/search/dtos/search-query.dto';


@Injectable()
export class MusicService {
  constructor(private readonly musicRepository: MusicRepository) { }

  create(createMusicDto: CreateMusicDto) {
    return this.musicRepository.create(createMusicDto);
  }

  findAll(searchQueryDto:SearchQueryDto) {
    return this.musicRepository.findAll(searchQueryDto.query);
  }

  findOne(id: number) {
    return this.musicRepository.findOne(id);
  }

  update(id: number, updateMusicDto: UpdateMusicDto) {
    return this.musicRepository.update(id, updateMusicDto);
  }

  remove(id: number) {
    return this.musicRepository.remove(id);
  }
}
