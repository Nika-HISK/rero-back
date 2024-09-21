import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, Put } from '@nestjs/common';
import { ChartService } from './chart.service';
import { CreateChartDto } from './dto/create-chart.dto';
import { UpdateChartDto } from './dto/update-chart.dto';
import { Roles } from 'src/auth/guard/jwt-roles.guard';
import { Role } from 'src/auth/guard/enum/role.enum';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('chart')
export class ChartController {
  constructor(private readonly chartService: ChartService) {}


  @Roles(Role.USER, Role.ADMIN)
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'musicAudio', maxCount: 1 },
      { name: 'coverImage', maxCount: 1 },
    ]),
  )
  async create(
    @UploadedFiles()
    files: {
      musicAudio?: Express.Multer.File[];
      coverImage?: Express.Multer.File[];
    },
    @Body() createChartDto: CreateChartDto,
  ) {
    const musicAudioFile = files.musicAudio ? files.musicAudio[0] : undefined;
    const coverImageFile = files.coverImage;
    return this.chartService.create(
      createChartDto,
      musicAudioFile,
      coverImageFile,
    );
  }

  @Roles(Role.USER, Role.ADMIN)
  @Get()
  findAll() {
    return this.chartService.findAll();
  }

  @Roles(Role.USER, Role.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chartService.findOne(Number(id));
  }

  @Roles(Role.ADMIN)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateChartDto: UpdateChartDto) {
    return this.chartService.update(Number(id), updateChartDto);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chartService.remove(Number(id));
  }
}
