import { Module } from '@nestjs/common';
import { TopchartsService } from './topcharts.service';
import { TopchartsController } from './topcharts.controller';

@Module({
  controllers: [TopchartsController],
  providers: [TopchartsService],
})
export class TopchartsModule {}
