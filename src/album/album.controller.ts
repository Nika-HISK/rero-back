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
  import { AlbumService } from './album.service';
  import { CreateAlbumDto } from './dtos/create-album.dto';
  import { UpdateAlbumDto } from './dtos/update-album.dto';
  import { Role } from 'src/auth/guard/enum/role.enum';
  import { Roles } from 'src/auth/guard/jwt-roles.guard';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { FilesService } from 'src/files/files.service';
  
  @Controller('album')
  export class AlbumController {
    constructor(
      private readonly albumService: AlbumService,
      private readonly filesService: FilesService,
    ) {}
  
    @Roles(Role.ADMIN)
    @Post()
    @UseInterceptors(FileInterceptor('albumCover'))
    async create(
      @UploadedFile() albumCover: Express.Multer.File,
      @Body() createAlbumDto: CreateAlbumDto,
    ) {
      if (albumCover) {
      
        const uploadedCover = await this.filesService.uploadFile(albumCover);
        createAlbumDto.albumCover = uploadedCover.url;
      }
      return this.albumService.create(createAlbumDto);
    }
  
    @Roles(Role.USER, Role.ADMIN)
    @Get()
    findAll() {
      return this.albumService.findAll();
    }
  
    @Roles(Role.USER, Role.ADMIN)
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.albumService.findOne(Number(id));
    }
  
    @Roles(Role.ADMIN)
    @Put(':id')
    @UseInterceptors(FileInterceptor('albumCover'))
    async update(
      @Param('id') id: string,
      @UploadedFile() albumCover: Express.Multer.File,
      @Body() updateAlbumDto: UpdateAlbumDto
    ) {
      if (albumCover) {
        const uploadedCover = await this.filesService.uploadFile(albumCover);
        updateAlbumDto.albumCover = uploadedCover.url;
      }
      return this.albumService.update(Number(id), updateAlbumDto);
    }
  
    @Roles(Role.ADMIN)
    @Delete(':id')
    delete(@Param('id') id: string) {
      return this.albumService.delete(Number(id));
    }
  }
  