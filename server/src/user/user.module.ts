import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AccessTokenStrategy } from './passport-strategy/access-token.strategy';
import { diskStorage } from 'multer';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const sanitizedFileName = file.originalname.replace(/\.\./g, '');
          cb(null, `${Date.now()}-${sanitizedFileName}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/image\/(jpeg|png|gif)/)) {
          return cb(new Error('Invalid file type'), false);
        }
        cb(null, true);
      },
    }),
    TypeOrmModule.forFeature([User]),
    JwtModule.register({}),
    ConfigModule,
  ],
  providers: [UserService, AccessTokenStrategy],
  controllers: [UserController],
  exports: [TypeOrmModule],
})
export class UserModule {}
