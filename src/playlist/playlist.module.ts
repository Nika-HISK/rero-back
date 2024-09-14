import { Module } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { PlaylistController } from './playlist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Playlist } from './entities/playlist.entity';
import { PlaylistRepository } from './repositories/playlist.repository';
import { MusicModule } from 'src/music/music.module';
import { AwsModule } from 'src/aws/aws.module';
import { FilesModule } from 'src/files/files.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Playlist]),
    MusicModule,
    AwsModule,
    FilesModule,
  ],
  controllers: [PlaylistController],
  providers: [PlaylistService, PlaylistRepository],
  exports: [PlaylistService],
})
export class PlaylistModule {}
