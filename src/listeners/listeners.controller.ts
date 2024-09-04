import { Controller, Get, Query } from '@nestjs/common';
import { ListenersService } from './listeners.service';
import { CreateListenerDto } from './dto/create-listener.dto';
import { Roles } from 'src/auth/guard/jwt-roles.guard';
import { Role } from 'src/auth/guard/enum/role.enum';

@Controller('listeners')
export class ListenersController {
  constructor(private readonly listenersService: ListenersService) {}

  @Roles(Role.USER)
  @Get()
  getStatistics(@Query() query: CreateListenerDto) {
    const { timestamp } = query;

    switch (timestamp) {
      case 'today':
        return this.listenersService.todays();
      case 'week':
        return this.listenersService.weeks();
      case 'month':
        return this.listenersService.months();
      default:
        return { message: 'use today week or month' };
    }
  }
}
