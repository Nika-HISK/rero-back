import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TopchartsService } from './topcharts.service';
import { CreateTopchartDto } from './dto/create-topchart.dto';
import { UpdateTopchartDto } from './dto/update-topchart.dto';

@Controller('topcharts')
export class TopchartsController {
  constructor(private readonly topchartsService: TopchartsService) {}

  @Post()
  create(@Body() createTopchartDto: CreateTopchartDto) {
    return this.topchartsService.create(createTopchartDto);
  }

  @Get()
  findAll() {
    return this.topchartsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.topchartsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTopchartDto: UpdateTopchartDto) {
    return this.topchartsService.update(+id, updateTopchartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.topchartsService.remove(+id);
  }
}
