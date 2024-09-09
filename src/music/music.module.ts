import { Module } from '@nestjs/common';
import { MusicController } from './music.controller';
import { MusicService } from './music.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Music } from './entities/music.entity';
import { MusicRepository } from './repositories/music.repository';
import { FileUploadService } from '../file-upload/file-upload.service';
import { S3Module } from 'src/s3/s3.module';

@Module({
  imports: [TypeOrmModule.forFeature([Music]), S3Module],
  controllers: [MusicController],
  providers: [MusicService, MusicRepository, FileUploadService],
})
export class MusicModule {}
