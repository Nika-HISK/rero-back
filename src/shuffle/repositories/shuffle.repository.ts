import { InjectRepository } from "@nestjs/typeorm";
import { Music } from "src/music/entities/music.entity";
import { Repository } from "typeorm";

export class ShuffleRepository {
    constructor(
        @InjectRepository(Music)
        private readonly musicRepo: Repository<Music>,
    ) {}

    async findAll() {
        const musicList = await this.musicRepo.find();
        return this.shuffleArray(musicList);
    }

    private shuffleArray(array: any[]): any[] {
        return array.sort(() => Math.random() - 0.5);
    }
}
