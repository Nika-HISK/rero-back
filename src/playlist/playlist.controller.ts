import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { Roles } from 'src/auth/guard/jwt-roles.guard';
import { Role } from 'src/auth/guard/enum/role.enum';

@Controller('playlist')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Roles(Role.USER, Role.ADMIN)
  @Post()
  async create(@Body() createPlaylistDto: CreatePlaylistDto, @Req() req) {
    const userId = req.user?.id;

    if (!userId) {
      throw new UnauthorizedException('User not found');
    }

    return this.playlistService.create(createPlaylistDto, userId);
  }

  @Roles(Role.USER, Role.ADMIN)
  @Get()
  findAll() {
    return this.playlistService.findAll();
  }

  @Roles(Role.USER, Role.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playlistService.findOne(Number(id));
  }

  @Roles(Role.USER, Role.ADMIN)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatePlaylistDto: UpdatePlaylistDto,
  ) {
    return this.playlistService.update(Number(id), updatePlaylistDto);
  }

  @Roles(Role.USER, Role.ADMIN)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.playlistService.delete(Number(id));
  }

  @Roles(Role.USER, Role.ADMIN)
  @Post(':id/add/:musicId')
  async addMusic(@Param('id') id: number, @Param('musicId') musicId: number) {
    return this.playlistService.addMusic(id, musicId);
  }

  @Roles(Role.USER, Role.ADMIN)
  @Delete(':id/add/:musicId')
  async deleteMusic(
    @Param('id') id: number,
    @Param('musicId') musicId: number,
  ) {
    return this.playlistService.deleteMusic(id, musicId);
  }
}
