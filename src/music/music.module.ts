import { Module } from '@nestjs/common';
import { MusicController } from './music.controller';
import { MusicService } from './music.service';
import { MusicRepository } from './music.repository';


@Module({
  controllers: [MusicController],
  providers: [MusicService,MusicRepository],
  
})
export class MusicModule {}
