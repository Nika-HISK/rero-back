import { Injectable } from '@nestjs/common';
import { CreateListenerDto } from './dto/create-listener.dto';
import { UpdateListenerDto } from './dto/update-listener.dto';
import { ListenersRepository } from './repositories/listeners.repository';

@Injectable()
export class ListenersService {

constructor(private readonly listenersrepository:ListenersRepository) {}


  todays() {
    return this.listenersrepository.todays()
  }

  weeks() {
    return this.listenersrepository.weeks()
  }

  months() {
    return this.listenersrepository.months()
  }

}