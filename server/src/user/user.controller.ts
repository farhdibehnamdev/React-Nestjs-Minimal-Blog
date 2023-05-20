import {
  Controller,
  Body,
  Post,
  Version,
  Get,
  Query,
  HttpCode,
  UseGuards,
  Patch,
  Put,
  Param,
} from '@nestjs/common';
import { SigninUserDto } from './dto/login.dto';
import { SignUpUserDto } from './dto/signup-user.dto';
import { JWTTokens, UserService, createUserStatus } from './user.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { PaginationQueryDto } from 'src/common/pagination-query.dto';
import User, { UserRole } from './entities/user.entity';
import { usersDataAndCount } from './types/user.type';
import { Role } from './decorators/role';
import { AccessTokenGuard } from './guard/access-token.guard';
import { RoleGuard } from './guard/authorization.guard';
import { FindOptionsWhere, Like } from 'typeorm';
import {
  PatchUserManagementDto,
  PutUserManagementDto,
} from './dto/userManagement.dto';

type paginationTitle = {
  pagination: PaginationQueryDto;
  title: string;
};

const paginationTitleType: paginationTitle = {
  pagination: { limit: 5, offset: 0 },
  title: '',
};

@Controller('auth/')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Version('1')
  @Post('signup')
  @HttpCode(200)
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

  @Role(UserRole.USER)
  @Role(UserRole.ADMIN)
  @UseGuards(AccessTokenGuard, RoleGuard)
  @Version('1')
  @Get('users')
  async findAll(
    @Query('all') all: boolean,
    @Query() paginationTitleType: paginationTitle,
  ): Promise<usersDataAndCount> {
    if (all) {
      const usersData = await this.userService.findAll(
        all,
        paginationTitleType.pagination,
        {
          firstName: paginationTitleType.title,
        },
      );
      return usersData;
    } else if (
      paginationTitleType.title === null ||
      paginationTitleType.title === undefined ||
      paginationTitleType.title === ''
    ) {
      return this.userService.paginate(paginationTitleType.pagination);
    } else {
      const searchCriteria: FindOptionsWhere<User> = {
        firstName: Like(`%${paginationTitleType.title}%`),
      };

      return this.userService.findAll(
        all,
        paginationTitleType.pagination,
        searchCriteria,
      );
    }
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

  @Role(UserRole.USER)
  @Role(UserRole.ADMIN)
  @Version('1')
  @Put('user/update')
  async putUpdate(@Body() putUserManagementDto: PutUserManagementDto) {
    return await this.userService.putUpdate(putUserManagementDto);
  }

  @Role(UserRole.USER)
  @Role(UserRole.ADMIN)
  @Version('1')
  @Patch('user/update/:id')
  async patchUpdate(
    @Param('id') id: string,
    @Body() patchUserManagementDto: PatchUserManagementDto,
  ) {
    console.log('patch update :: ', id);
    console.log('patchUserManagementDto :: ', patchUserManagementDto);
    return await this.userService.patchUpdate(id, patchUserManagementDto);
  }
}
