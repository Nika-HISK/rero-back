import { Injectable } from '@nestjs/common';
import { CreateTopchartDto } from './dto/create-topchart.dto';
import { UpdateTopchartDto } from './dto/update-topchart.dto';
import { TopchartsRepostitory } from './repositories/topcharts.respository';

@Injectable()
export class TopchartsService {
  constructor(private readonly topChartsRepository:TopchartsRepostitory) {}

  topCharts() {
    return this.topChartsRepository.getStatistics()
  }
}
