import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dtos/create-artist.dto';
import { UpdateArtistDto } from './dtos/update-artist.dto';

@Controller('artist')
export class ArtistController {
    constructor(private readonly artistService:ArtistService) {}

    @Get()
    findAll() {
        return this.artistService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id : string) {
        return this.artistService.findOne(Number(id))
    }

    @Post()
    create(@Body() data:CreateArtistDto) {
        return this.artistService.create(data)
    }

    @Delete(':id')
    delete(@Param('id') id:string) {
        return this.artistService.delete(Number(id))
    }

    @Patch(':id')
    update(@Param('id') id : string, @Body() data:UpdateArtistDto) {
        return this.artistService.update(Number(id), data) 
    }

}