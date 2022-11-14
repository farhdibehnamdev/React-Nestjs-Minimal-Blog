import { Module } from '@nestjs/common';
import { ArticleModule } from './article/article.module';
import { CategoryModule } from './categories/categories.module';
import { TagsController } from './tags/tags.controller';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

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
  ],
  controllers: [TagsController],
})
export class AppModule {
  constructor() {
    console.log(process.env.USERNAMEDB);
    console.log(process.env.POSTGRES_PASSWORD);
  }
}
