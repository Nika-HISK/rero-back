import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { MusicService } from './music.service';
import { CreateMusicDto } from './dtos/create-music.dto';
import { UpdateMusicDto } from './dtos/update-music.dto';
import { Role } from 'src/auth/guard/enum/role.enum';
import { Roles } from 'src/auth/guard/jwt-roles.guard';

@Controller('music')
export class MusicController {
  constructor(private readonly musicService: MusicService) {}

  @Roles(Role.USER, Role.ADMIN)
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'musicAudio', maxCount: 1 },
      { name: 'coverImage', maxCount: 1 },
    ]),
  )
  async create(
    @UploadedFiles()
    files: {
      musicAudio?: Express.Multer.File[];
      coverImage?: Express.Multer.File[];
    },
    @Body() createMusicDto: CreateMusicDto,
  ) {
    const musicAudioFile = files.musicAudio ? files.musicAudio[0] : undefined;
    const coverImageFile = files.coverImage;
    return this.musicService.create(
      createMusicDto,
      musicAudioFile,
      coverImageFile,
    );
  }

  @Roles(Role.USER, Role.ADMIN)
  @Get()
  findAll() {
    return this.musicService.findAll();
  }

  @Roles(Role.USER, Role.ADMIN)
  @Get('/shuffle')
  findShuffledArray() {
    return this.musicService.findShuffledArray()
  }

  @Roles(Role.USER, Role.ADMIN)
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
