import {
  Controller,
  Body,
  Post,
  Get,
  Delete,
  Patch,
  Param,
} from '@nestjs/common';
import {
  Query,
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
  create(@UploadedFile() file, @Body() createArticleDto: CreateArticleDto) {
    if (file) {
      createArticleDto.image = file.path;
    }
    return this.articleService.create(createArticleDto);
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
