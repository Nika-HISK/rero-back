import { Module } from '@nestjs/common';
import { TopchartsService } from './topcharts.service';
import { TopchartsController } from './topcharts.controller';
import { TopchartsRepostitory } from './repositories/topcharts.respository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Topchart } from './entities/topchart.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Topchart])],
  controllers: [TopchartsController],
  providers: [TopchartsService, TopchartsRepostitory],
})
export class TopchartsModule {}
