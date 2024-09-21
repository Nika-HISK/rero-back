import { Injectable } from '@nestjs/common';
import { CreateTopchartDto } from './dto/create-topchart.dto';
import { UpdateTopchartDto } from './dto/update-topchart.dto';

@Injectable()
export class TopchartsService {
  create(createTopchartDto: CreateTopchartDto) {
    return 'This action adds a new topchart';
  }

  findAll() {
    return `This action returns all topcharts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} topchart`;
  }

  update(id: number, updateTopchartDto: UpdateTopchartDto) {
    return `This action updates a #${id} topchart`;
  }

  remove(id: number) {
    return `This action removes a #${id} topchart`;
  }
}
