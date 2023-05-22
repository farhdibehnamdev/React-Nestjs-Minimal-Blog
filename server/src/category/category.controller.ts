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

type paginationTitleType = {
  title: string;
  pagination: PaginationQueryDto;
};

@Controller('api/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Role(UserRole.USER, UserRole.ADMIN)
  @UseGuards(AccessTokenGuard, RoleGuard)
  @Version('1')
  @Get()
  async findAll(
    @Query('all') all: boolean,
    @Query() paginationTitle: paginationTitleType,
  ) {
    if (all) {
      return await this.categoryService.findAll(
        all,
        paginationTitle.pagination,
        { title: paginationTitle.title },
      );
    }

    if (!paginationTitle.title) {
      return this.categoryService.paginate(paginationTitle.pagination);
    }

    const searchCriteria: FindOptionsWhere<Category> = {
      title: Like(`%${paginationTitle.title}%`),
    };

    return this.categoryService.findAll(
      all,
      paginationTitle.pagination,
      searchCriteria,
    );
  }

  // @Version('1')
  // @Get()
  // async findAll(
  //   @Query('all') all: boolean,
  //   @Query() paginationTitle: paginationTitleType,
  // ) {
  //   if (all) {
  //     return await this.categoryService.findAll(
  //       all,
  //       paginationTitle.pagination,
  //       {
  //         title: paginationTitle.title,
  //       },
  //     );
  //   } else if (
  //     paginationTitle.title === null ||
  //     paginationTitle.title === undefined ||
  //     paginationTitle.title === ''
  //   ) {
  //     return this.categoryService.paginate(paginationTitle.pagination);
  //   } else {
  //     const searchCriteria: FindOptionsWhere<Category> = {
  //       title: Like(`%${paginationTitle.title}%`),
  //     };
  //     return this.categoryService.findAll(
  //       all,
  //       paginationTitle.pagination,
  //       searchCriteria,
  //     );
  //   }
  // }
  @Role(UserRole.USER, UserRole.ADMIN)
  @UseGuards(AccessTokenGuard, RoleGuard)
  @Version('1')
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.categoryService.findOne(id);
  }
  @Role(UserRole.USER, UserRole.ADMIN)
  @UseGuards(AccessTokenGuard, RoleGuard)
  @Version('1')
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }
  @Role(UserRole.USER, UserRole.ADMIN)
  @UseGuards(AccessTokenGuard, RoleGuard)
  @Version('1')
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    return this.categoryService.update(id, createCategoryDto);
  }

  @Role(UserRole.USER, UserRole.ADMIN)
  @UseGuards(AccessTokenGuard, RoleGuard)
  @Version('1')
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.categoryService.remove(id);
  }
}
