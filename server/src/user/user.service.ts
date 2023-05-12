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
import { usersDataAndCount } from './types/user.type';
import { MailerService } from '@nestjs-modules/mailer';
import { v4 as uuidv4 } from 'uuid';
import { UnverifiedUserException } from 'src/filters/UnverifiedUserException';

export type createUserStatus = {
  status: number;
};

export interface JWTTokens {
  accessToken: string;
  refreshToken: string;
}

class UserResponse {
  id: string;
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
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
    private readonly mailerService: MailerService,
  ) {}

  async createUser(signUpUserDto: SignUpUserDto): Promise<createUserStatus> {
    try {
      const existingUser = await this.userRepository.findOne({
        where: { email: signUpUserDto.email },
      });

      if (existingUser)
        throw new HttpException('Email already registered!', 400);
      const createdUser = this.userRepository.create(signUpUserDto);
      const protectedPassword = await this.hashPassword(signUpUserDto.password);
      createdUser.role = UserRole.USER;
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
    if (user.isVerified) {
      if (!user) throw new HttpException('Invalid credentials', 400);

      const validPassword = await compare(password, user.password);

      if (!validPassword) throw new HttpException('Invalid credentials', 400);
      const { accessToken, refreshToken } = await this.getTokens(user);
      const userInfo = new UserResponse();
      userInfo.id = user.id;
      userInfo.email = user.email;
      userInfo.role = user.role;
      return { accessToken, refreshToken, userInfo };
    }
    throw new UnverifiedUserException();
  }

  async findAll(): Promise<usersDataAndCount> {
    const [items, count] = await this.userRepository.findAndCount();
    console.log('tt :', items, count);
    return { data: items, count };
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
      userInfo.role = user.role;
      return { isAuthenticated: true, userInfo };
    } catch (error) {
      return false;
    }
  }
  private async getTokens(user: User): Promise<JWTTokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: user.email, role: user.role },
        {
          secret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
          expiresIn: this.configService.get<string>(
            'JWT_ACCESS_TOKEN_EXPIRATION',
          ),
        },
      ),
      this.jwtService.signAsync(
        { sub: user.email, role: user.role },
        {
          secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
          expiresIn: this.configService.get<string>(
            'JWT_REFRESH_TOKEN_EXPIRATION',
          ),
        },
      ),
    ]);
    console.log('acc ::', accessToken);
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
