import { Controller, Body, Post, Version } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { SignUpUserDto } from './dto/signup-user.dto';
import { UserService } from './user.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('api/auth/')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Version('1')
  @Post('signup')
  async signup(@Body() signUpUserDto: SignUpUserDto) {
    return await this.userService.createUser(signUpUserDto);
  }
  @Version('1')
  @Post('signin')
  async signin(@Body() loginDto: LoginDto) {
    return await this.userService.signin(loginDto);
  }
  @Version('1')
  @Post('refresh-token')
  async refreshToken(@Body() { refreshToken }: RefreshTokenDto) {
    return await this.userService.refreshTokens(refreshToken);
  }
}
