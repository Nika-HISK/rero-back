import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  async login(email: string, password: string) {

    const user = await this.userService.findOneByEmail(email);
    console.log('User:', user); 
    console.log('Password:', password)
    console.log('Stored Password:', user?.password);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = {
      sub: user.id,
      email: user.email,
    };


    return  this.jwtService.sign(payload)
  }
}
