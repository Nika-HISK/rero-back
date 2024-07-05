import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MusicService } from './music.repository';
import { CreateMusicDto } from './dtos/create-music.dto';
import { UpdateMusicDto } from './dtos/update-music.dto';

@Controller('music')
export class MusicController {
  constructor(private readonly musicService: MusicService) {}

  @Get()
  findAll() {
    return this.musicService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.musicService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() data: UpdateMusicDto) {
    return this.musicService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.musicService.remove(id);
  }

  @Post()
  create(@Body() data: CreateMusicDto) {
    return this.musicService.create(data);
  }
}
