import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Article from './entities/article.entity';
import { CategoryModule } from 'src/category/category.module';
import { TagModule } from 'src/tag/tag.module';
import { MulterModule } from '@nestjs/platform-express';
import { UserModule } from 'src/user/user.module';
import { diskStorage } from 'multer';

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
    TagModule,
    CategoryModule,
    UserModule,
    TypeOrmModule.forFeature([Article]),
  ],
  providers: [ArticleService],
  controllers: [ArticleController],
})
export class ArticleModule {}
