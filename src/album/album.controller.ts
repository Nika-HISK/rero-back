import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dtos/create-album.dto';
import { UpdateAlbumDto } from './dtos/update-album.dto';

@Controller('album')
export class AlbumController {

    constructor(private readonly AlbumService: AlbumService) {}
    @Get()
    findAll() {
        return this.AlbumService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.AlbumService.findOne(Number(id))
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.AlbumService.delete(Number(id))
    }

    @Post()
    create(@Body() data: CreateAlbumDto) {
        return this.AlbumService.create(data)
    }   

    @Patch(':id')
    update(@Param('id') id : string, @Body() data:UpdateAlbumDto) {
        return this.AlbumService.update(Number(id), data)
    }
}
