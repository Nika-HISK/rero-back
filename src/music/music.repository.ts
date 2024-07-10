import { Injectable } from '@nestjs/common';


@Injectable()
export class MusicRepository {
  findAll() {
    return 'all musics';
  }

  findOne(id: number) {
    return `music on ${id}`;
  }

  create(data: Object) {}

  delete(id: number) {
    return `deletes on id ${id}`;
  }

  update(id: number, data: Object) {
    return `updates ${data} on id ${id}`;
  }
}
