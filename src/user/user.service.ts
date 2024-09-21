import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repositories/user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepo.create(createUserDto);
  }

  findAll() {
    return this.userRepo.findAll();
  }

  findOne(id: number) {
    return this.userRepo.findOne(id);
  }

  async findOneByEmail(email: string) {
    return this.userRepo.findOneByEmail(email);
  }

  async changePassword(id: number, password: string) {
    const user = await this.userRepo.findOne(id);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    return this.userRepo.update(id, { password: hashedPassword });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepo.update(id, updateUserDto);
  }

  delete(id: number) {
    return this.userRepo.delete(id);
  }

  banUser(id: number) {
    return this.userRepo.banUser(id);
  }

  unbunUser(id: number) {
    return this.userRepo.unbanUser(id);
  }
}
