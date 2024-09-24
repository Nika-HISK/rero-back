import { Module } from '@nestjs/common';
import { ListenersService } from './listeners.service';
import { ListenersController } from './listeners.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Listener } from './entities/listener.entity';
import { ListenersRepository } from './repositories/listeners.repository';
import { MusicRepository } from 'src/music/repositories/music.repository';
import { Music } from 'src/music/entities/music.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Listener, Music])],
  controllers: [ListenersController],
  providers: [ListenersService, ListenersRepository, MusicRepository],
  exports:[ListenersRepository]
})
export class ListenersModule {}