import { Injectable } from '@nestjs/common';
import { CreateListenerDto } from './dto/create-listener.dto';
import { UpdateListenerDto } from './dto/update-listener.dto';

@Injectable()
export class ListenersService {
  create(createListenerDto: CreateListenerDto) {
    return 'This action adds a new listener';
  }

  findAll() {
    return `This action returns all listeners`;
  }

  findOne(id: number) {
    return `This action returns a #${id} listener`;
  }

  update(id: number, updateListenerDto: UpdateListenerDto) {
    return `This action updates a #${id} listener`;
  }

  remove(id: number) {
    return `This action removes a #${id} listener`;
  }
}
