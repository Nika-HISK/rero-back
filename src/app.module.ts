import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MusicModule } from './music/music.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumModule } from './album/album.module';
import { ArtistModule } from './artist/artist.module';
import { SearchModule } from './search/search.module';
import { UserModule } from './user/user.module';
import { Playlist } from './playlist/entities/playlist.entity';
import { Music } from './music/entities/music.entity';
import { PlaylistModule } from './playlist/playlist.module';

@Module({
  imports: [
    MusicModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'nikushakima54321',
      database: 'rero-db',
      autoLoadEntities: true,
      synchronize: true,
      entities: [Playlist, Music],
    }),
    AlbumModule,
    ArtistModule,
    SearchModule,
    UserModule,
    PlaylistModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
