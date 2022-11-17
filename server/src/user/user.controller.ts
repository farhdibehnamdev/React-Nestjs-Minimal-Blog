import { Controller, Body, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { SignUpUserDto } from './dto/signup-user.dto';
import { UserService } from './user.service';

@Controller('api/auth/')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signup(@Body() sginUpUserDto: SignUpUserDto) {
    return await this.userService.createUser(sginUpUserDto);
  }

  @Post('signin')
  async login(@Body() loginDto: LoginDto) {
    return await this.userService.signin(loginDto);
  }
}
