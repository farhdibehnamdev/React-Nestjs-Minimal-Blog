import { Module } from '@nestjs/common';
import { ArticleModule } from './article/article.module';
import { CategoryModule } from './category/category.module';
import { TagController } from './tag/tag.controller';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TagService } from './tag/tag.service';
import { TagModule } from './tag/tag.module';

import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'pass123',
      database: 'blogdb',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ArticleModule,
    CategoryModule,
    UserModule,
    TagModule,
  ],
  controllers: [TagController],
  providers: [TagService],
})
export class AppModule {}
