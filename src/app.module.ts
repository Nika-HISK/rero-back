import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MusicModule } from './music/music.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistController } from './artist/artist.controller';
import { ArtistModule } from './artist/artist.module';

@Module({
  imports: [
    MusicModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'rero-db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ArtistModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
