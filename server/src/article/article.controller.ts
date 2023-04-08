import {
  Controller,
  Body,
  Post,
  Get,
  Delete,
  Patch,
  Param,
  HttpException,
  HttpStatus,
  ParseFilePipe,
} from '@nestjs/common';
import {
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Version,
} from '@nestjs/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { PaginationQueryDto } from 'src/common/pagination-query.dto';
import { Role } from 'src/user/decorators/role';
import { UserRole } from 'src/user/entities/user.entity';
import { AccessTokenGuard } from 'src/user/guard/access-token.guard';
import { RoleGuard } from 'src/user/guard/authorization.guard';
import { FindOptionsWhere, Like } from 'typeorm';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import Article from './entities/article.entity';
import { createReadStream, createWriteStream } from 'fs';
import { createThumbnail } from 'src/utils/thumbnailGenerator';

@Controller('api/article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Version('1')
  @Get()
  findAll(
    @Query() pagination: PaginationQueryDto,
    @Query('title') title?: string,
  ) {
    if (title === null || title === undefined || title === '') {
      return this.articleService.paginate(pagination);
    } else {
      const searchCriteria: FindOptionsWhere<Article> = {
        title: Like(`%${title}%`),
      };
      return this.articleService.findAll(false, pagination, searchCriteria);
    }
  }
  @Version('1')
  @Get()
  findOne(id: number) {
    return this.articleService.findOne(id);
  }
  // @Role(UserRole.ADMIN)
  // @UseGuards(AccessTokenGuard, RoleGuard)
  @Version('1')
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @UploadedFile() image,
    @Body() createArticleDto: CreateArticleDto,
  ) {
    console.log('image :::', image);
    let imageObj;
    if (image) {
      const filename = `${Date.now()}-${image.originalname}`;
      const fullImagePath = `./uploads/${filename}`;
      const thumbnailImagepath = `./uploads/${filename}`;
      const fileContents = createReadStream(fullImagePath);
      await fileContents.pipe(createWriteStream(fullImagePath));
      await createThumbnail(fullImagePath, thumbnailImagepath);

      imageObj = {
        image: {
          fieldname: image.fieldname,
          originalname: image.originalname,
          encoding: image.encoding,
          mimetype: image.mimetype,
          destination: image.destination,
          filename,
          path: fullImagePath,
          size: image.size,
        },
      };
    }
    return this.articleService.create(createArticleDto, imageObj);
  }

  @Version('1')
  @Role(UserRole.ADMIN)
  @UseGuards(AccessTokenGuard, RoleGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articleService.update(id, updateArticleDto);
  }
  @Version('1')
  @Role(UserRole.ADMIN)
  @UseGuards(AccessTokenGuard, RoleGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.articleService.remove(id);
  }
}
