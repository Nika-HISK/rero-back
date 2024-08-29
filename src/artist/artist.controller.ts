import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dtos/create-artist.dto';
import { UpdateArtistDto } from './dtos/update-artist.dto';
import { Role } from 'src/auth/gurad/enum/role.enum';
import { Roles } from 'src/auth/gurad/jwt-roles.guard';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) { }
  @Roles(Role.ADMIN)
  @Post()
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.artistService.findOne(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateArtistDto: UpdateArtistDto) {
    return this.artistService.update(Number(id), updateArtistDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.artistService.delete(Number(id));
  }
}
