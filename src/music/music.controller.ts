import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { CreateMusicDto } from './dtos/create-music.dto';
import { UpdateMusicDto } from './dtos/update-music.dto';
import { MusicService } from './music.service';
import { SearchQueryDto } from 'src/search/dtos/search-query.dto';
import { Public } from 'src/auth/guard/jwt.strategy';
import { Role } from 'src/auth/guard/enum/role.enum';
import { Roles } from 'src/auth/guard/jwt-roles.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('music')
export class MusicController {
  constructor(private readonly musicService: MusicService) { }

  
  @Roles(Role.ADMIN)
  @Post()
  create(@Body() createMusicDto: CreateMusicDto) {
    return this.musicService.create(createMusicDto);
  }

  @Roles(Role.USER)
  @Get()
  findAll() {
    return this.musicService.findAll();
  }

  @Roles(Role.USER)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.musicService.findOne(Number(id));
  }

  @Roles(Role.ADMIN)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateMusicDto: UpdateMusicDto) {
    return this.musicService.update(Number(id), updateMusicDto);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.musicService.remove(Number(id));
  }
}
