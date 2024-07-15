import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dtos/create-album.dto';
import { UpdateAlbumDto } from './dtos/update-album.dto';
import { AlbumRepository } from './repositories/album.repository';

@Injectable()
export class AlbumService {

    constructor(private readonly AlbumRepository: AlbumRepository) { }

    create(createAlbumDto: CreateAlbumDto) {
        return this.AlbumRepository.create(createAlbumDto)
    }

    findAll() {
        return this.AlbumRepository.findAll()
    }

    findOne(id: number) {
        return this.AlbumRepository.findOne(id)
    }

    update(id: number, updateAlbumDto: UpdateAlbumDto) {
        return this.AlbumRepository.update(id, updateAlbumDto)
    }

    delete(id: number) {
        return this.AlbumRepository.delete(id)
    }

}
