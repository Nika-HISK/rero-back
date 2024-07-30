import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ListenersService } from './listeners.service';
import { CreateListenerDto } from './dto/create-listener.dto';
import { UpdateListenerDto } from './dto/update-listener.dto';

@Controller('listeners')
export class ListenersController {
  constructor(private readonly listenersService: ListenersService) {}



  @Get()
  todays() {
    return this.listenersService.todays();
  }


  @Get()
  weeks() {
    return this.listenersService.weeks();
  }


  @Get()
  months() {
    return this.listenersService.months();
  }
}