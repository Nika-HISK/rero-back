import { Module } from '@nestjs/common';
import { MusicController } from './music.controller';
import { MusicService } from './music.repository';

@Module({
  controllers: [MusicController],
  providers: [MusicService],
})
export class MusicModule {}
