import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Put,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from 'src/auth/guard/enum/role.enum';
import { Roles } from 'src/auth/guard/jwt-roles.guard';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @Roles(Role.USER, Role.ADMIN)
  @Get('me')
  async me(@Req() req: any) {
    return await this.userService.me(req.user.id)
  }
  @Roles(Role.USER, Role.ADMIN)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Roles(Role.ADMIN)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Roles(Role.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Roles(Role.ADMIN)
  @Put(':id/change-password')
  changePassword(@Param('id') id: string, @Body('password') password: string) {
    return this.userService.changePassword(+id, password);
  }

  @Roles(Role.ADMIN)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Roles(Role.USER, Role.ADMIN)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.delete(+id);
  }

  @Roles(Role.ADMIN)
  @Put('/ban/:id')
  banUser(@Param('id') id: string) {
    return this.userService.banUser(Number(id));
  }

  @Roles(Role.ADMIN)
  @Put('/unban/:id')
  unBanUser(@Param('id') id: string) {
    return this.userService.unbanUser(Number(id));
  }
}
