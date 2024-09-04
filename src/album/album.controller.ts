import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dtos/create-album.dto';
import { UpdateAlbumDto } from './dtos/update-album.dto';
import { SearchQueryDto } from 'src/search/dtos/search-query.dto';
import { Role } from 'src/auth/guard/enum/role.enum';
import { Roles } from 'src/auth/guard/jwt-roles.guard';

@Controller('album')
export class AlbumController {

    constructor(private readonly AlbumService: AlbumService) { }

    @Roles(Role.ADMIN)
    @Post()
    create(@Body() createAlbumDto: CreateAlbumDto) {
        return this.AlbumService.create(createAlbumDto)
    }

    @Roles(Role.USER)
    @Get()
    findAll() {
        return this.AlbumService.findAll()
    }

    @Roles(Role.USER)
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.AlbumService.findOne(Number(id))
    }

    @Roles(Role.ADMIN)
    @Put(':id')
    update(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
        return this.AlbumService.update(Number(id), updateAlbumDto)
    }

    @Roles(Role.ADMIN)
    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.AlbumService.delete(Number(id))
    }

}
