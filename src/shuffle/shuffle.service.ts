import { Injectable } from '@nestjs/common';
import { ShuffleRepository } from './repositories/shuffle.repository';

@Injectable()
export class ShuffleService {
    constructor(private readonly ShuffleRepository:ShuffleRepository) {}
    findAll() {
        return this.ShuffleRepository.findAll()
    }
}