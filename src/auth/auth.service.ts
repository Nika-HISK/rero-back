import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { Jwtconstantcs } from './gurad/secret';
import { Role } from './gurad/enum/role.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  async login(createUserDto: CreateUserDto) {
    const {email, password} =createUserDto
    const user = await this.userService.findOneByEmail(email)
    const checkPassword = user && await bcrypt.compare(password,user.password)
    if(checkPassword) {
      const payload = {id: user.id, email:user.email,role:Role.USER}
      return {
        accessToken: await this.jwtService.signAsync(payload,Jwtconstantcs)
      }
    }
    return 'error'
  }
}
