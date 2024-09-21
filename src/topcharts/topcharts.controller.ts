import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TopchartsService } from './topcharts.service';
import { CreateTopchartDto } from './dto/create-topchart.dto';
import { UpdateTopchartDto } from './dto/update-topchart.dto';
import { Roles } from 'src/auth/guard/jwt-roles.guard';
import { Role } from 'src/auth/guard/enum/role.enum';

@Controller('topcharts')
export class TopchartsController {
  constructor(private readonly topchartsService: TopchartsService) {}

  @Roles(Role.USER, Role.ADMIN)
  @Get()
  topCharts() {
    return this.topchartsService.topCharts()
  }

}
