import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { userRepository } from './repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: userRepository) {}

  create(createUserDto: CreateUserDto) {
    if (createUserDto.password !== createUserDto.confirmPassword) {
      throw new BadRequestException('password does not match');
    }

    return this.userRepo.create(createUserDto);
  }

  findAll() {
    return this.userRepo.findAll();
  }

  findOne(id: number) {
    return this.userRepo.findOne(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepo.update(id, updateUserDto);
  }

  delete(id: number) {
    return this.userRepo.delete(id);
  }
}
