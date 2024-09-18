import { Module } from '@nestjs/common';
import { MusicController } from './music.controller';
import { MusicService } from './music.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Music } from './entities/music.entity';
import { MusicRepository } from './repositories/music.repository';
import { AwsModule } from 'src/aws/aws.module';
import { FilesModule } from 'src/files/files.module';
import { ArtistModule } from 'src/artist/artist.module';
import { Listener } from 'src/listeners/entities/listener.entity';
import { ListenersRepository } from 'src/listeners/repositories/listeners.repository';
import { ListenersModule } from 'src/listeners/listeners.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Music, Listener]),
    AwsModule,
    FilesModule,
    ArtistModule,
    ListenersModule
  ],
  controllers: [MusicController],
  providers: [MusicService, MusicRepository, ListenersRepository],
  exports: [MusicService],
})
export class MusicModule {}
