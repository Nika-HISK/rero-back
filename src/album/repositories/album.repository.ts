import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Album } from "../entities/album.entity";
import { CreateAlbumDto } from "../dtos/create-album.dto";
import { UpdateAlbumDto } from "../dtos/update-album.dto";



@Injectable()

export class AlbumRepository {
    constructor(
        @InjectRepository(Album)
        private readonly albumRepo: Repository<Album>
    ) { }

    findAll() {
        return this.albumRepo.find()
    }

    findOne(id: number) {
        return this.albumRepo.findOneBy({ id })
    }

    delete(id: number) {
        return this.albumRepo.delete(id)
    }

    create(data: CreateAlbumDto) {
        const newAlbum = this.albumRepo.create(data)

        return this.albumRepo.save(newAlbum)
    }

    update(id: number, updateAlbumDto: UpdateAlbumDto) {
        return this.albumRepo.update(id, updateAlbumDto)
    }
}