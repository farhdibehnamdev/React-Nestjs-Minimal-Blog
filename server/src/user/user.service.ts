import { Injectable, NotFoundException, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignUpUserDto } from './dto/signup-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import User, { UserRole } from './entities/user.entity';
import { hash, compare } from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { usersDataAndCount } from './types/user.type';
import { MailerService } from '@nestjs-modules/mailer';
import { v4 as uuidv4 } from 'uuid';

export type createUserStatus = {
  status: number;
};

export interface JWTTokens {
  accessToken: string;
  refreshToken: string;
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

  async signin(loginDto: LoginDto): Promise<JWTTokens> {
    const { email, password } = loginDto;
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new HttpException('Invalid credentials', 400);

    const validPassword = await compare(password, user.password);

    if (!validPassword) throw new HttpException('Invalid credentials', 400);

    return this.getTokens(user);
  }

  async findAll(): Promise<usersDataAndCount> {
    const [items, count] = await this.userRepository.findAndCount();
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
    return {
      accessToken,
      refreshToken,
    };
  }

  async sendVerificationEmail(userEmail: string, verificationToken: string) {
    const verifyUrl = `https://localhost:3001/auth/verify-email?token=${verificationToken}`;

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

    return { message: 'Email successfully verified', status: 200 };
  }
}
