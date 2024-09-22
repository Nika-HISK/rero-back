import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { Jwtconstantcs } from './guard/secret';
import { UserRepository } from 'src/user/repositories/user.repository';
import { Role } from 'src/auth/guard/enum/role.enum'; 

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository:UserRepository,
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
      throw new HttpException('The email or password you entered is incorrect', HttpStatus.BAD_REQUEST);
    }
    const payload = { sub: user.id, email: user.email, role: user.role};

    if(user.banned) { 
      
      throw new  UnauthorizedException()
    }     
    return {
      accessToken: await this.jwtService.signAsync(payload, Jwtconstantcs),
    };
  }

  async loginAdmin(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    
    
    const user = await this.userService.findOneByEmail(email);

    
    const isPasswordCorrect = user && (await bcrypt.compare(password, user.password));
    if (!isPasswordCorrect) {
      throw new HttpException('The email or password you entered is incorrect', HttpStatus.BAD_REQUEST);
    }

    if (user.role !== Role.ADMIN) {
      throw new UnauthorizedException('Access denied. Admins only.');
    }

    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      accessToken: await this.jwtService.signAsync(payload, Jwtconstantcs),
    };
  }
}