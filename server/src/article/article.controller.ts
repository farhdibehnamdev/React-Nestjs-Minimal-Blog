import {
  Controller,
  Body,
  Post,
  Get,
  Delete,
  Patch,
  Param,
} from '@nestjs/common';
import { PaginationQueryDto } from 'src/common/pagination-query.dto';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('api/article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  findAll(paginationQueryDto: PaginationQueryDto) {
    return this.articleService.findAll(paginationQueryDto);
  }

  @Get()
  findOne(id: number) {
    return this.articleService.findOne(id);
  }

  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.create(createArticleDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articleService.update(id, updateArticleDto);
  }

  @Delete(':id')
  remove(id: number) {
    return this.articleService.remove(id);
  }
}
