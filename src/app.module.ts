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
import { ListenersModule } from './listeners/listeners.module';
import { Playlist } from './playlist/entities/playlist.entity';
import { Music } from './music/entities/music.entity';
import { PlaylistModule } from './playlist/playlist.module';
import { AuthModule } from './auth/auth.module';
import { Artist } from './artist/entities/artist.entity';
import { Album } from './album/entities/album.entity';
import { FilesModule } from './files/files.module';
import { AwsModule } from './aws/aws.module';
import { FileEntity } from './files/entities/file.entity';
import { JwtModule } from '@nestjs/jwt';
import { ChartModule } from './chart/chart.module';
import { TopchartsModule } from './topcharts/topcharts.module';


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
      entities: [Playlist, Music, Artist, Album, FileEntity],
    }),
    AlbumModule,
    ArtistModule,
    SearchModule,
    UserModule,
    ListenersModule,
    PlaylistModule,
    AuthModule,
    FilesModule,
    AwsModule,
    JwtModule,
    ChartModule,
    TopchartsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
