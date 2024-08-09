import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MusicModule } from './music/music.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumModule } from './album/album.module';
import { ArtistModule } from './artist/artist.module';
import { SearchModule } from './search/search.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { Playlist } from './playlist/entities/playlist.entity';
import { Music } from './music/entities/music.entity';
import { PlaylistModule } from './playlist/playlist.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MusicModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
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
