import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { And, Between, Repository } from 'typeorm';
import { Listener } from '../entities/listener.entity';

@Injectable()
export class ListenersRepository {
  constructor(
    @InjectRepository(Listener)
    private readonly listenerRepo: Repository<Listener>,
  ) {}

  async todays() {
    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 1);

    const mostViewedRequest = await this.listenerRepo
      .createQueryBuilder('music')
      .select(['music.id as musicId',
      'COUNT(music.id) as viewCount'])
      .where('music.createdAt BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .groupBy('music.id')
      .orderBy('viewCount', 'DESC')
      .getRawOne();

    return mostViewedRequest;
  }

  async weeks() {
    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 7);

    const mostViewedRequest = await this.listenerRepo
    .createQueryBuilder('music')
    .select(['music.id as musicId',
    'COUNT(music.id) as viewCount'])    
    .where('music.createdAt BETWEEN :startDate AND :endDate', {
      startDate,
      endDate,
    })
    .groupBy('music.id')
    .orderBy('viewCount', 'DESC')
    .getRawOne();

  return mostViewedRequest;
  }

  async months() {
    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 30);

    const mostViewedRequest = await this.listenerRepo
    .createQueryBuilder('music')
    .select(['music.id as musicId',
    'COUNT(music.id) as viewCount'])
    .where('music.createdAt BETWEEN :startDate AND :endDate', {
      startDate,
      endDate,
    })
    .groupBy('music.id')
    .orderBy('viewCount', 'DESC')
    .getRawOne();

  return mostViewedRequest;
  }
}
