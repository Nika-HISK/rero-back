import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dtos/create-artist.dto';
import { UpdateArtistDto } from './dtos/update-artist.dto';
import { ArtistRepository } from './repositories/artist.repository';

@Injectable()
export class ArtistService {
    constructor(private readonly artistRepository: ArtistRepository) { }

    create(createArtistDto: CreateArtistDto) {
        return this.artistRepository.create(createArtistDto)
    }

    findAll() {
        return this.artistRepository.findAll()
    }

    findOne(id: number) {
        return this.artistRepository.findOne(id)
    }

    update(id: number, updateArtistDto: UpdateArtistDto) {
        return this.artistRepository.update(id, updateArtistDto)
    }

    delete(id: number) {
        return this.artistRepository.delete(id)
    }

}
