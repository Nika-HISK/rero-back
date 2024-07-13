import { Injectable } from "@nestjs/common";
import { CreateArtistDto } from "./dtos/create-artist.dto";
import { UpdateArtistDto } from "./dtos/update-artist.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Artist } from "./entities/artist.entity";
import { Repository } from "typeorm";


@Injectable() 


export class ArtistRepository { 
    constructor(
        @InjectRepository(Artist)
        private readonly artistRepo:Repository<Artist>
    ) {}
    findAll() {
        return this.artistRepo.find()
    }

    findOne(id:number) {
        return this.artistRepo.findOneBy({id})
    }

    create(data:CreateArtistDto) {
        const newArtist = this.artistRepo.create(data)
        return this.artistRepo.save(newArtist)
    }

    delete(id:number) {
        return this.artistRepo.delete(id)
    }

    update(id:number, data:UpdateArtistDto) {
        return this.artistRepo.update(id,data)
    }
}