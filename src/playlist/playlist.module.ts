import { Module } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { PlaylistController } from './playlist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Playlist } from './entities/playlist.entity';
import { PlaylistRepository } from './repositories/playlist.repository';
import { MusicModule } from 'src/music/music.module';
import { AwsModule } from 'src/aws/aws.module';
import { FilesModule } from 'src/files/files.module';
import { MusicRepository } from 'src/music/repositories/music.repository';
import { Music } from 'src/music/entities/music.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Playlist, Music]),
    MusicModule,
    AwsModule,
    FilesModule,
  ],
  controllers: [PlaylistController],
  providers: [PlaylistService, PlaylistRepository, MusicRepository],
  exports: [PlaylistService],
})
export class PlaylistModule {}
