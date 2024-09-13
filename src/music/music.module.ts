import { Module } from '@nestjs/common';
import { MusicController } from './music.controller';
import { MusicService } from './music.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Music } from './entities/music.entity';
import { MusicRepository } from './repositories/music.repository';
import { AwsModule } from 'src/aws/aws.module';
import { FilesModule } from 'src/files/files.module';

@Module({
  imports: [TypeOrmModule.forFeature([Music]), AwsModule, FilesModule],
  controllers: [MusicController],
  providers: [MusicService, MusicRepository],
  exports: [MusicService],
})
export class MusicModule {}
