import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from './entities/artist.entity';
import { ArtistRepository } from './repositories/artist.repository';
import { AwsModule } from 'src/aws/aws.module';
import { FilesModule } from 'src/files/files.module';

@Module({
  imports: [TypeOrmModule.forFeature([Artist]),AwsModule,FilesModule],
  controllers: [ArtistController],
  providers: [ArtistService, ArtistRepository]
})
export class ArtistModule { }