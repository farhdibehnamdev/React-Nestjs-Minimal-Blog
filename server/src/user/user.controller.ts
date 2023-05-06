import { Controller, Body, Post, Version, Get, Query } from '@nestjs/common';
import { SigninUserDto } from './dto/login.dto';
import { SignUpUserDto } from './dto/signup-user.dto';
import { JWTTokens, UserService, createUserStatus } from './user.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { PaginationQueryDto } from 'src/common/pagination-query.dto';
import { usersDataAndCount } from './types/user.type';

@Controller('auth/')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Version('1')
  @Post('signup')
  async signup(
    @Body() signUpUserDto: SignUpUserDto,
  ): Promise<createUserStatus> {
    return await this.userService.createUser(signUpUserDto);
  }
  @Version('1')
  @Post('signin')
  async signin(@Body() signinUserDto: SigninUserDto): Promise<JWTTokens> {
    return await this.userService.signin(signinUserDto);
  }
  @Version('1')
  @Get('verify-email')
  async verifyEmail(@Query('token') token: string) {
    return this.userService.verifyEmailToken(token);
  }

  @Version('1')
  @Get('users')
  async findAll(
    @Query('all') all: boolean,
    @Query() pagination: PaginationQueryDto,
    @Query('title') title?: string,
  ): Promise<usersDataAndCount> {
    if (all) {
      const ress = await this.userService.findAll();
      return ress;
    }
    return { data: null, count: 0 };
  }

  @Version('1')
  @Post('refresh-token')
  async refreshToken(
    @Body() { refreshToken }: RefreshTokenDto,
  ): Promise<JWTTokens> {
    return await this.userService.refreshTokens(refreshToken);
  }
}
