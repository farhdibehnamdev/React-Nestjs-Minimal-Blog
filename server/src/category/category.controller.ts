import {
  Controller,
  Body,
  Post,
  Get,
  Delete,
  Patch,
  Param,
  Version,
  UseGuards,
  Query,
} from '@nestjs/common';
import { PaginationQueryDto } from 'src/common/pagination-query.dto';
import { Role } from 'src/user/decorators/role';
import { UserRole } from 'src/user/entities/user.entity';
import { AccessTokenGuard } from 'src/user/guard/access-token.guard';
import { RoleGuard } from 'src/user/guard/authorization.guard';
import { FindOptionsWhere, Like } from 'typeorm';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';

@Controller('api/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Version('1')
  @Get()
  async findAll(
    @Query('all') all: boolean,
    @Query() pagination: PaginationQueryDto,
    @Query('title') title?: string,
  ) {
    if (all) {
      const categories = await this.categoryService.findAll(all, pagination, {
        title,
      });
      return { data: categories, count: categories.count };
    } else {
      const searchCriteria: FindOptionsWhere<Category> = {
        title: Like(`%${title}%`),
      };
      if (title === null || title === undefined || title === '') {
        return this.categoryService.paginate(pagination);
      } else {
        return this.categoryService.findAll(all, pagination, searchCriteria);
      }
    }
  }
  @Version('1')
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.categoryService.findOne(id);
  }
  // @Role(UserRole.ADMIN)
  // @UseGuards(AccessTokenGuard, RoleGuard)
  @Version('1')
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }
  // @Role(UserRole.ADMIN)
  // @UseGuards(AccessTokenGuard, RoleGuard)
  @Version('1')
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    return this.categoryService.update(id, createCategoryDto);
  }

  // @Role(UserRole.ADMIN)
  // @UseGuards(AccessTokenGuard, RoleGuard)
  @Version('1')
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.categoryService.remove(id);
  }
}
