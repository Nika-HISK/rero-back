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

@Module({
  imports:[TypeOrmModule.forFeature([Chart]),
  AwsModule,
  FilesModule,
  ArtistModule,
  ListenersModule],
  controllers: [ChartController],
  providers: [ChartService, ChartRepository],
})
export class ChartModule {}
