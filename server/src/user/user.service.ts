import { Injectable, NotFoundException, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignUpUserDto } from './dto/signup-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import User, { UserRole } from './entities/user.entity';
import { hash, compare } from 'bcrypt';
import { SigninUserDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
import { v4 as uuidv4 } from 'uuid';
import { UnverifiedUserException } from 'src/filters/UnverifiedUserException';
import { UserNotFoundException } from 'src/filters/UserNotFoundException';
import { BaseService } from 'src/common/Base.service';
import {
  PatchUserManagementDto,
  UserManagementDto,
} from './dto/userManagement.dto';
import { UsersActivationException } from 'src/filters/UsersActivationException';
import { UserProfileDto } from './dto/UserProfileDto';

export type createUserStatus = {
  status: number;
};

export interface JWTTokens {
  accessToken: string;
  refreshToken: string;
}

class UserResponse {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string;
  email: string;
  role: string;
}

interface SignInResponse {
  accessToken: string;
  refreshToken: string;
  userInfo: UserResponse;
}

export interface VerifyTokenType {
  isAuthenticated: boolean;
  userInfo: UserResponse;
}

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
    private readonly mailerService: MailerService,
  ) {
    super(userRepository);
  }

  async createUser(signUpUserDto: SignUpUserDto): Promise<createUserStatus> {
    try {
      const existingUser = await this.userRepository.findOne({
        where: { email: signUpUserDto.email },
      });

      if (existingUser)
        throw new HttpException('Email already registered!', 400);
      const createdUser = this.userRepository.create(signUpUserDto);
      const protectedPassword = await this.hashPassword(signUpUserDto.password);
      createdUser.userRole = UserRole.USER;
      createdUser.password = protectedPassword;
      const verificationToken = uuidv4();
      createdUser.verificationEmailToken = verificationToken;
      await this.userRepository.save(createdUser);
      await this.sendVerificationEmail(createdUser.email, verificationToken);
      return { status: 200 };
    } catch (err) {
      throw err;
    }
  }

  async signin(signInDto: SigninUserDto): Promise<SignInResponse> {
    const { email, password } = signInDto;
    const user = await this.userRepository.findOne({ where: { email } });
    if (user.isActive === false || user.isVerified === false)
      throw new UsersActivationException();
    if (!user) throw new UserNotFoundException();
    if (user.isVerified) {
      const validPassword = await compare(password, user.password);

      if (!validPassword) throw new HttpException('Invalid credentials', 404);
      const { accessToken, refreshToken } = await this.getTokens(
        user,
        signInDto.rememberMe,
      );
      const userInfo = new UserResponse();
      userInfo.id = user.id;
      userInfo.firstName = user.firstName;
      userInfo.lastName = user.lastName;
      userInfo.avatar = user.avatar;
      userInfo.email = user.email;
      userInfo.role = user.userRole;
      return { accessToken, refreshToken, userInfo };
    }
    throw new UnverifiedUserException();
  }

  async findById(id: string): Promise<User> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const userFound = await this.userRepository.findOne({ where: { id } });
    if (!userFound) throw new NotFoundException('User Not Found!!!');
    Object.assign(userFound, updateUserDto);
    return this.userRepository.save(userFound);
  }

  async patchUpdate(
    id: string,
    patchUserManagementDto: PatchUserManagementDto,
  ) {
    const userFound = await this.userRepository.findOne({ where: { id } });
    if (!userFound) throw new NotFoundException('User Not Found !!!');
    Object.assign(userFound, patchUserManagementDto);
    return this.userRepository.save(userFound);
  }

  async putUpdate(putUserManagementDto: UserManagementDto) {
    const userFound = await this.userRepository.findOne({
      where: { id: putUserManagementDto.id },
    });
    if (!userFound) throw new NotFoundException('User Not Found!!!');
    Object.assign(userFound, putUserManagementDto);
    return this.userRepository.save(userFound);
  }

  async profile(id: string, userProfileDto: UserProfileDto, file: any) {
    const userFound = await this.userRepository.findOne({ where: { id } });
    if (!userFound) throw new NotFoundException('User Not Found!!!');
    if (
      userProfileDto.newPassword !== null &&
      userProfileDto.newPassword !== '' &&
      userProfileDto.newPassword !== undefined
    ) {
      const validatePassword = await compare(
        userProfileDto.newPassword,
        userFound.password,
      );
      if (!validatePassword)
        throw new HttpException('Invalid credentials', 404);
      const protectedPassword = await this.hashPassword(
        userProfileDto.newPassword,
      );
      userFound.password = protectedPassword;
    }

    const filename = file.filename;
    const manipulateFile = { ...file, filename };

    if (file) {
      userFound.avatar = manipulateFile;
    }
    Object.assign(userFound, userProfileDto);
    const data = await this.userRepository.save(userFound);
    const { firstName, lastName, avatar } = data as User;
    return { firstName, lastName, avatar };
  }

  async addUser(addUserDto: UserManagementDto) {
    try {
      const existingUser = await this.userRepository.findOne({
        where: { email: addUserDto.email },
      });
      if (existingUser)
        throw new HttpException('Email already registered!', 400);

      const createdUser = this.userRepository.create({
        email: addUserDto.email,
        password: addUserDto.password,
        isActive: addUserDto.isActive,
        isVerified: addUserDto.isVerified,
        firstName: addUserDto.firstName,
        lastName: addUserDto.lastName,
      });

      const protectedPassword = await this.hashPassword(addUserDto.password);
      createdUser.userRole = addUserDto.userRole as UserRole;
      createdUser.password = protectedPassword;

      const verificationToken = uuidv4();
      createdUser.verificationEmailToken = verificationToken;
      await this.userRepository.save(createdUser);
      await this.sendVerificationEmail(createdUser.email, verificationToken);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string): Promise<User> {
    const userFound = await this.userRepository.findOne({ where: { id } });
    if (!userFound) throw new NotFoundException('User Not Found!!!');
    return this.userRepository.remove(userFound);
  }

  async refreshTokens(token: string): Promise<JWTTokens> {
    try {
      const { sub: email } = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
      });
      const user = await this.userRepository.findOneOrFail({
        where: { email },
      });
      return this.getTokens(user);
    } catch (err) {
      throw new HttpException('Invalid credentials', 400);
    }
  }

  private hashPassword(password: string): Promise<string> {
    return hash(password, 10);
  }

  async verifyToken(
    accessToken: string,
    refreshToken: string,
  ): Promise<VerifyTokenType | boolean> {
    try {
      const decodeAccessToken = await this.jwtService.verifyAsync(accessToken);
      const decodeRefreshToken = await this.jwtService.verifyAsync(
        refreshToken,
      );
      const user = await this.findById(decodeAccessToken.id);
      if (!user || !user.isActive) {
        return false;
      }
      const userInfo = new UserResponse();
      userInfo.email = user.email;
      userInfo.id = user.id;
      userInfo.role = user.userRole;
      return { isAuthenticated: true, userInfo };
    } catch (error) {
      return false;
    }
  }
  private async getTokens(
    user: User,
    rememberMe: boolean = false,
  ): Promise<JWTTokens> {
    const expirationTime = rememberMe ? '7d' : '1h';
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: user.email, role: user.userRole },
        {
          secret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
          expiresIn: expirationTime,
        },
      ),
      this.jwtService.signAsync(
        { sub: user.email, role: user.userRole },
        {
          secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
          expiresIn: this.configService.get<string>(
            'JWT_REFRESH_TOKEN_EXPIRATION',
          ),
        },
      ),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  async sendVerificationEmail(userEmail: string, verificationToken: string) {
    const verifyUrl = `http://localhost:3000/auth/verified?token=${verificationToken}`;

    await this.mailerService.sendMail({
      to: userEmail,
      subject: 'Email Verification',
      template: 'email-verification',
      context: {
        email: userEmail,
        verificationURL: verifyUrl,
      },
    });
  }

  async verifyEmailToken(token: string) {
    const user = await this.userRepository.findOne({
      where: { verificationEmailToken: token },
    });
    if (!user) {
      throw new NotFoundException('Invalid or expired verification token');
    }

    user.isVerified = true;
    user.verificationEmailToken = null;
    await this.userRepository.save(user);
  }
}
