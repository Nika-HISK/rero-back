import { Controller, Get, Query } from '@nestjs/common';
import { ListenersService } from './listeners.service';
import { CreateListenerDto } from './dto/create-listener.dto';
import { Roles } from 'src/auth/guard/jwt-roles.guard';
import { Role } from 'src/auth/guard/enum/role.enum';

@Controller('listeners')
export class ListenersController {
  constructor(private readonly listenersService: ListenersService) {}

  @Roles(Role.USER, Role.ADMIN)
  @Get()
  getStatistics(): Promise<any[]> {
    return this.listenersService.getStatistics()
  }
}
