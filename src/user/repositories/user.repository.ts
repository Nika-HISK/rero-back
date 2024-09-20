import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, createQueryBuilder } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const newUser = new User();
    newUser.email = createUserDto.email;
    newUser.password = hashedPassword;

    return this.userRepo.save(newUser);
  }

  async findAll() {
    const query = this.userRepo
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.playlists', 'playlist')
      .leftJoinAndSelect('playlist.musics', 'music');

    return await query.getMany();
  }

  findOne(id: number) {
    return this.userRepo.findOneBy({ id });
  }

  async banUser(id: number) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.banned = true;
    return this.userRepo.save(user);
  }

  async unbanUser(id: number) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.banned = false;
    return this.userRepo.save(user);
  }

  async findOneByEmail(email: string) {
    return this.userRepo.findOneBy({ email });
  }

  async updatePassword(id: number, newPassword: string) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    return this.userRepo.save(user);
  }

  update(id: number, data: UpdateUserDto) {
    return this.userRepo.update(id, data);
  }

  delete(id: number) {
    return this.userRepo.delete(id);
  }
}
