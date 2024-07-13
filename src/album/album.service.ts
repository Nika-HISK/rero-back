import { Injectable } from '@nestjs/common';
import { AlbumRepository } from './album.repository';
import { CreateAlbumDto } from './dtos/create-album.dto';
import { UpdateAlbumDto } from './dtos/update-album.dto';

@Injectable()
export class AlbumService {

    constructor(private readonly AlbumRepository:AlbumRepository) {}

    findAll() {
        return this.AlbumRepository.findAll()
    }

    findOne(id:number) {
        return this.AlbumRepository.findOne(id)
    }

    delete(id:number) {
        return this.AlbumRepository.delete(id)
    }

    create(data:CreateAlbumDto) {
        return this.AlbumRepository.create(data)
    }

    update(id:number, data:UpdateAlbumDto) {
        return this.AlbumRepository.update(id, data)
    }
}
