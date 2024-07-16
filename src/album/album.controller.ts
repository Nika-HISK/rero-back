import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dtos/create-album.dto';
import { UpdateAlbumDto } from './dtos/update-album.dto';
import { SearchQueryDto } from 'src/search/dtos/search-query.dto';

@Controller('album')
export class AlbumController {

    constructor(private readonly AlbumService: AlbumService) { }

    @Post()
    create(@Body() createAlbumDto: CreateAlbumDto) {
        return this.AlbumService.create(createAlbumDto)
    }

    @Get()
    findAll(@Query() searchQueryDto: SearchQueryDto) {
        return this.AlbumService.findAll(searchQueryDto)
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.AlbumService.findOne(Number(id))
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
        return this.AlbumService.update(Number(id), updateAlbumDto)
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.AlbumService.delete(Number(id))
    }

}
