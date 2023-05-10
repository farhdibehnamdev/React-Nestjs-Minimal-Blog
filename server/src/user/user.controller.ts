import {
  Controller,
  Body,
  Post,
  Version,
  Get,
  Query,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { SigninUserDto } from './dto/login.dto';
import { SignUpUserDto } from './dto/signup-user.dto';
import { JWTTokens, UserService, createUserStatus } from './user.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { PaginationQueryDto } from 'src/common/pagination-query.dto';
import { usersDataAndCount } from './types/user.type';
import { UserRole } from './entities/user.entity';
import { Role } from './decorators/role';
import { AccessTokenGuard } from './guard/access-token.guard';
import { RoleGuard } from './guard/authorization.guard';

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
  @HttpCode(200)
  async signin(@Body() signinUserDto: SigninUserDto): Promise<JWTTokens> {
    return await this.userService.signin(signinUserDto);
  }
  @Version('1')
  @Get('verify-email')
  async verifyEmail(@Query('token') token: string) {
    return this.userService.verifyEmailToken(token);
  }

  @Role(UserRole.ADMIN)
  @UseGuards(AccessTokenGuard, RoleGuard)
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

  @Version('1')
  @Post('verify-tokens')
  @HttpCode(200)
  async verifyTokens(
    @Body() tokens: { accessToken: string; refreshToken: string },
  ) {
    return await this.userService.verifyToken(
      tokens.accessToken,
      tokens.refreshToken,
    );
  }
}
