import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MusicModule } from './music/music.module';
import { MusicRepository } from './music/music.repository';

@Module({
  imports: [MusicModule],
  controllers: [AppController],
  providers: [AppService,MusicRepository],
})
export class AppModule {}

