import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CreateMusicDto } from './dtos/create-music.dto';
import { UpdateMusicDto } from './dtos/update-music.dto';
import { MusicService } from './music.service';

@Controller('music')
export class MusicController {
  constructor(private readonly musicService:MusicService) {}

  @Get()  
  findAll() {
    return this.musicService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.musicService.findOne(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateMusicDto) {
    return this.musicService.update(Number(id), data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.musicService.remove(Number(id));
  }

  @Post()
  create(@Body() data: CreateMusicDto) {
    return this.musicService.create(data);
  }
}
