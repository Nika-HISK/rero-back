import { Controller, Get, Query } from '@nestjs/common';
import { ListenersService } from './listeners.service';
import { CreateListenerDto } from './dto/create-listener.dto';

@Controller('listeners')
export class ListenersController {
  constructor(private readonly listenersService: ListenersService) {}

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
        return { message: 'Invalid timestamp. Use "today", "week", or "month".' };
    }
  }
}
