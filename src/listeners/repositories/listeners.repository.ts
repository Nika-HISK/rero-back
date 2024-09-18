import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Listener } from '../entities/listener.entity';

@Injectable()
export class ListenersRepository {
  constructor(
    @InjectRepository(Listener)
    private readonly listenerRepo: Repository<Listener>,
  ) {}

  async getStatistics(): Promise<any[]> {
    return this.listenerRepo
      .createQueryBuilder('listener')
      .select('listener.musicId', 'musicId')
      .addSelect('COUNT(listener.id)', 'listenCount') 
      .groupBy('listener.musicId') 
      .orderBy('listenCount', 'DESC') 
      .getRawMany(); 
  }
}
