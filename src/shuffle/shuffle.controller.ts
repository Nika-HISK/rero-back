import { Controller, Get } from '@nestjs/common';
import { ShuffleService } from './shuffle.service';
import { Roles } from 'src/auth/guard/jwt-roles.guard';
import { Role } from 'src/auth/guard/enum/role.enum';

@Controller('shuffle')
export class ShuffleController {
  constructor(private readonly shuffleService: ShuffleService) {}

  @Roles(Role.USER, Role.ADMIN)
  @Get()
  findAll() {
    return this.shuffleService.findAll()
  }
}
