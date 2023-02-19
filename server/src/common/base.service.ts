import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { PaginationQueryDto } from './pagination-query.dto';
import {
  Brackets,
  FindOperator,
  FindOptionsWhere,
  Like,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';

export class BaseService<T> {
  constructor(private readonly repository: Repository<T>) {}

  async paginate(paginationQuery: PaginationQueryDto) {
    try {
      const { limit, offset } = paginationQuery;
      console.log('my offset:', offset);
      const newSkip = offset <= 1 ? 0 : (offset - 1) * limit;
      console.log('newSkip:', newSkip);
      const [items, total] = await this.repository.findAndCount({
        skip: newSkip,
        take: limit,
      });
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
    // const newSkip = offset * limit;
    const newSkip = offset <= 1 ? 0 : (offset - 1) * limit;

    const [items, total] = await this.repository.findAndCount({
      skip: newSkip,
      take: limit,
      //   where: [{ title: Like(`%${tagTitle}%`) }],
      where: searchCriteria,
    });
    if (!items) throw new NotFoundException("There isn't any Tags!!");
    return { data: items, count: total };
  }
}
