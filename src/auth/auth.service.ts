import {
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { Jwtconstantcs } from './guard/secret';
import { Role } from './guard/enum/role.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const { email } = createUserDto;

    const existingUser = await this.userService.findOneByEmail(email);
    if (existingUser) {
      throw new HttpException('Email already in use', HttpStatus.BAD_REQUEST);
    }

    return this.userService.create(createUserDto);
  }

  async login(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    const user = await this.userService.findOneByEmail(email);
    const isPasswordCorrect = user && (await bcrypt.compare(password, user.password));
    if (!isPasswordCorrect) {
      throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
    }
    const payload = { i: user.id, email: user.email, role: user.role};
    return {
      accessToken: await this.jwtService.signAsync(payload, Jwtconstantcs),
    };
  }
}