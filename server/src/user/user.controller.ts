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
  Delete,
  UseInterceptors,
  UploadedFile,
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
  UserManagementDto,
} from './dto/userManagement.dto';
import { ROLE_KEY } from './decorators/role';
import { UserProfileDto } from './dto/UserProfileDto';
import { FileInterceptor } from '@nestjs/platform-express';
import { createThumbnail } from 'src/utils/thumbnailGenerator';

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

  @Role(UserRole.USER, UserRole.ADMIN)
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

  @Role(UserRole.USER, UserRole.ADMIN)
  @Version('1')
  @Put('user/update')
  async putUpdate(@Body() putUserManagementDto: UserManagementDto) {
    return await this.userService.putUpdate(putUserManagementDto);
  }

  @Role(UserRole.USER, UserRole.ADMIN)
  @Version('1')
  @Patch('user/update/:id')
  async patchUpdate(
    @Param('id') id: string,
    @Body() patchUserManagementDto: PatchUserManagementDto,
  ) {
    return await this.userService.patchUpdate(id, patchUserManagementDto);
  }

  @Role(UserRole.USER, UserRole.ADMIN)
  @Version('1')
  @Post('user/add')
  @HttpCode(200)
  async addUser(@Body() addUserDto: UserManagementDto) {
    return await this.userService.addUser(addUserDto);
  }

  @Role(UserRole.USER, UserRole.ADMIN)
  @Version('1')
  @Delete('user/remove/:id')
  async removeUser(@Param('id') id: string) {
    return await this.userService.remove(id);
  }

  @Role(UserRole.USER, UserRole.ADMIN)
  @Version('1')
  @Patch('user/profile/:id')
  @UseInterceptors(FileInterceptor('avatar'))
  @HttpCode(200)
  async profile(
    @UploadedFile() avatar,
    @Param('id') id: string,
    @Body() userProfileDto: UserProfileDto,
  ) {
    let imageObj;
    if (avatar) {
      const fullImagePath = `./uploads/profile/${avatar.filename}`;
      const thumbnailImagePath = `./uploads/profileAvatar/${avatar.filename}`;
      await createThumbnail(fullImagePath, thumbnailImagePath);
      imageObj = {
        image: {
          fieldname: avatar.fieldname,
          originalname: avatar.originalname,
          encoding: avatar.encoding,
          mimetype: avatar.mimetype,
          destination: avatar.destination,
          filename: avatar.filename,
          path: fullImagePath,
          size: avatar.size,
        },
      };
    }
    return this.userService.profile(id, userProfileDto, imageObj);
  }
}
