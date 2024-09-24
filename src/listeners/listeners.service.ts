import { Injectable } from '@nestjs/common';
import { CreateListenerDto } from './dto/create-listener.dto';
import { UpdateListenerDto } from './dto/update-listener.dto';
import { ListenersRepository } from './repositories/listeners.repository';

@Injectable()
export class ListenersService {

constructor(private readonly listenersrepository:ListenersRepository) {}

  getStatistics(): Promise<any[]> {
    return this.listenersrepository.getStatistics()
  }

  createListener(musicId:number) {
    return this.listenersrepository.create(musicId)
  }
 
}