import { Injectable } from '@nestjs/common';
import { ArtistRepository } from './artist.repository';
import { CreateArtistDto } from './dtos/create-artist.dto';
import { UpdateArtistDto } from './dtos/update-artist.dto';

@Injectable()
export class ArtistService {
    constructor(private readonly artistRepository:ArtistRepository) {}
    findAll() {
        return this.artistRepository.findAll()
    }

    findOne(id:number) {
        return this.artistRepository.findOne(id)
    }

    create(data:CreateArtistDto) {
        return this.artistRepository.create(data)
    }

    delete(id:number) {
        return this.artistRepository.delete(id)
    }

    update( id:number,data:UpdateArtistDto) {
        return this.artistRepository.update(id, data)
    }
}
