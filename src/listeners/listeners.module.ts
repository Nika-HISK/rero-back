import { Module } from '@nestjs/common';
import { ListenersService } from './listeners.service';
import { ListenersController } from './listeners.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Listener } from './entities/listener.entity';
import { ListenersRepository } from './repositories/listeners.repository';

@Module({
  imports:[TypeOrmModule.forFeature([Listener])],
  controllers: [ListenersController],
  providers: [ListenersService, ListenersRepository],
})
export class ListenersModule {}