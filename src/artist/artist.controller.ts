import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dtos/create-artist.dto';
import { UpdateArtistDto } from './dtos/update-artist.dto';
import { Role } from 'src/auth/guard/enum/role.enum';
import { Roles } from 'src/auth/guard/jwt-roles.guard';
import { FilesService } from 'src/files/files.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('artist')
export class ArtistController {
  constructor(
    private readonly artistService: ArtistService,
    private readonly filesService: FilesService,
  ) {}

  @Roles(Role.ADMIN)
  @Post()
  @UseInterceptors(FileInterceptor('artistPhoto'))
  async create(
    @UploadedFile() artistPhoto: Express.Multer.File,
    @Body() createArtistDto: CreateArtistDto,
  ) {
    if (artistPhoto) {
      
      const uploadedPhoto = await this.filesService.uploadFile(artistPhoto);
      createArtistDto.artistPhoto = uploadedPhoto.url;
    }
    return this.artistService.create(createArtistDto);
  }
  @Roles(Role.USER, Role.ADMIN)
  @Get('')
  findAll() {
    return this.artistService.findAll();
  }

  @Roles(Role.USER, Role.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.artistService.findOne(Number(id));
  }

  @Roles(Role.ADMIN)
  @Put(':id')
  @UseInterceptors(FileInterceptor('artistPhoto'))
  async update(
    @Param('id') id: string,
    @UploadedFile() artistPhoto: Express.Multer.File,
    @Body() updateArtistDto: UpdateArtistDto
  ) {
    if (artistPhoto) {

      const uploadedPhoto = await this.filesService.uploadFile(artistPhoto);
      updateArtistDto.artistPhoto = uploadedPhoto.url;
    }
    return this.artistService.update(Number(id), updateArtistDto);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.artistService.delete(Number(id));
  }
}
