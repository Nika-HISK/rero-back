import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { ArtistRepository } from './artist.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from './entities/artist.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Artist])],
  controllers:[ArtistController],
  providers: [ArtistService, ArtistRepository]
})
export class ArtistModule {}