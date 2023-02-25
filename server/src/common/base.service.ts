import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { PaginationQueryDto } from './pagination-query.dto';
import {
  Brackets,
  FindManyOptions,
  FindOperator,
  FindOptionsWhere,
  Like,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import Article from 'src/article/entities/article.entity';

export class BaseService<T> {
  constructor(private readonly repository: Repository<T>) {}
  isArticle(target: any): target is Article {
    return target && target.prototype instanceof Article;
  }

  async paginate(paginationQuery: PaginationQueryDto) {
    try {
      const { limit, offset } = paginationQuery;
      const newSkip = offset <= 1 ? 0 : (offset - 1) * limit;

      let options: FindManyOptions = {
        skip: newSkip,
        take: limit,
      };

      if (this.isArticle(this.repository.target)) {
        options.relations = ['category', 'tags'];
      }
      const [items, total] = await this.repository.findAndCount(options);
      return { data: items, count: total };
    } catch (error) {
      throw new HttpException(
        'مشکلی در سرور رخ داده است لطفآ بعدآ دوباره تلاش نمایید',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(
    paginationQuery: PaginationQueryDto,
    searchCriteria: FindOptionsWhere<T>,
  ) {
    const { limit, offset } = paginationQuery;
    const newSkip = offset <= 1 ? 0 : (offset - 1) * limit;

    let options: FindManyOptions = {
      skip: newSkip,
      take: limit,
      where: searchCriteria,
    };

    if (this.isArticle(this.repository.target)) {
      options.relations = ['category', 'tags'];
    }
    const [items, total] = await this.repository.findAndCount(options);

    if (!items) throw new NotFoundException("There isn't any Tags!!");
    return { data: items, count: total };
  }
}
