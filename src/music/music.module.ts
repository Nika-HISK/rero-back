import { Module } from '@nestjs/common';
import { MusicController } from './music.controller';
import { MusicService } from './music.service';
import { MusicRepository } from './music.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Music } from './entities/music.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Music])],
  controllers: [MusicController],
  providers: [MusicService, MusicRepository],
})
export class MusicModule {}
