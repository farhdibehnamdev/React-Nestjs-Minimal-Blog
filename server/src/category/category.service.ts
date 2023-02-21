import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/Base.service';
import { PaginationQueryDto } from 'src/common/pagination-query.dto';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService extends BaseService<Category> {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {
    super(categoryRepository);
  }

  // async findAll(paginationQuery: PaginationQueryDto) {
  //   const { offset, limit } = paginationQuery;
  //   const resOffset = offset - 1;
  //   const newSkip = resOffset <= 0 ? 0 : resOffset * limit;
  //   const [categories, total] = await this.categoryRepository.findAndCount({
  //     skip: newSkip,
  //     take: limit,
  //   });
  //   if (!categories) throw new NotFoundException("There isn't any Category.");
  //   return { data: categories, count: total };
  // }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) throw new NotFoundException('Category Not Found!!!');

    return category;
  }

  async create(createCategoryDto: CreateCategoryDto) {
    const category = this.categoryRepository.create(createCategoryDto);
    return await this.categoryRepository.save(category);
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const categoryFound = await this.categoryRepository.findOne({
      where: { id },
    });
    if (!categoryFound) throw new NotFoundException('Category Not Found!!');
    Object.assign(categoryFound, updateCategoryDto);
    return this.categoryRepository.save(categoryFound);
  }

  async remove(id: number) {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) throw new NotFoundException('Category Not Found!!');
    return this.categoryRepository.remove(category);
  }
}
