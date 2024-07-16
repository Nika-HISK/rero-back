import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dtos/create-album.dto';
import { UpdateAlbumDto } from './dtos/update-album.dto';
import { AlbumRepository } from './repositories/album.repository';
import { SearchQueryDto } from 'src/search/dtos/search-query.dto';

@Injectable()
export class AlbumService {

    constructor(private readonly albumRepository: AlbumRepository) { }


    findAllAlbums(){
        return this.albumRepository.findAll()
    }

    create(createAlbumDto: CreateAlbumDto) {
        return this.albumRepository.create(createAlbumDto)
    }

    findAll(searchQueryDto: SearchQueryDto) {
        return this.albumRepository.findAll(searchQueryDto.query)
    }

    findOne(id: number) {
        return this.albumRepository.findOne(id)
    }

    update(id: number, updateAlbumDto: UpdateAlbumDto) {
        return this.albumRepository.update(id, updateAlbumDto)
    }

    delete(id: number) {
        return this.albumRepository.delete(id)
    }

}
