import { Module } from '@nestjs/common';
import { ShuffleService } from './shuffle.service';
import { ShuffleController } from './shuffle.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShuffleRepository } from './repositories/shuffle.repository';
import { Music } from 'src/music/entities/music.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Music])],
  controllers: [ShuffleController],
  providers: [ShuffleService, ShuffleRepository],
})
export class ShuffleModule {}
