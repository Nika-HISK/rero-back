import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { AlbumRepository } from 'src/album/repositories/album.repository';
import { MusicRepository } from 'src/music/repositories/music.repository';
import { ArtistRepository } from 'src/artist/repositories/artist.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Music } from 'src/music/entities/music.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Album } from 'src/album/entities/album.entity';
import { SearchService } from './search.service';

@Module({
    imports:[TypeOrmModule.forFeature([Music,Artist,Album])],
    controllers:[SearchController],
    providers:[AlbumRepository,MusicRepository,ArtistRepository,SearchService]
})
export class SearchModule {}
