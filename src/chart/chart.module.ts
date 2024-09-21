import { Module } from '@nestjs/common';
import { ChartService } from './chart.service';
import { ChartController } from './chart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chart } from './entities/chart.entity';
import { ChartRepository } from './repositories/chart.respository';
import { AwsModule } from 'src/aws/aws.module';
import { FilesModule } from 'src/files/files.module';
import { ArtistModule } from 'src/artist/artist.module';
import { ListenersModule } from 'src/listeners/listeners.module';
import { Topchart } from 'src/topcharts/entities/topchart.entity';
import { TopchartsRepostitory } from 'src/topcharts/repositories/topcharts.respository';

@Module({
  imports:[TypeOrmModule.forFeature([Chart, Topchart]),
  AwsModule,
  FilesModule,
  ArtistModule,
  ListenersModule],
  controllers: [ChartController],
  providers: [ChartService, ChartRepository, TopchartsRepostitory],
})
export class ChartModule {}
