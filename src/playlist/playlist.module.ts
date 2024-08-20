import { Module } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { PlaylistController } from './playlist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Playlist } from './entities/playlist.entity';
import { PlaylistRepository } from './repositories/playlist.repository';
import { MusicService } from 'src/music/music.service';
import { MusicRepository } from 'src/music/repositories/music.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Playlist])],
  controllers: [PlaylistController],
  providers: [
    PlaylistService,
    PlaylistRepository,
    MusicService,
    MusicRepository,
  ],
  exports: [PlaylistService],
})
export class PlaylistModule {}
