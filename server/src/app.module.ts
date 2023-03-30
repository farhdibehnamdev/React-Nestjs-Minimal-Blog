import { Module } from '@nestjs/common';
import { ArticleModule } from './article/article.module';
import { CategoryModule } from './category/category.module';
import { TagController } from './tag/tag.controller';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TagService } from './tag/tag.service';
import { TagModule } from './tag/tag.module';
import { validate } from './config/env.validation';
import { MessageModule } from './message/message.module';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    ArticleModule,
    CategoryModule,
    UserModule,
    TagModule,
    MessageModule,
  ],
  controllers: [TagController],
  providers: [TagService],
})
export class AppModule {}
