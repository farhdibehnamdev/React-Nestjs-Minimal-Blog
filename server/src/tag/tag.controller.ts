import {
  Controller,
  Get,
  Patch,
  Delete,
  Post,
  Param,
  Body,
  Version,
  UseGuards,
} from '@nestjs/common';
import { Put, Query, Req } from '@nestjs/common/decorators';
import { PaginationQueryDto } from 'src/common/pagination-query.dto';
import { Role } from 'src/user/decorators/role';
import { UserRole } from 'src/user/entities/user.entity';
import { AccessTokenGuard } from 'src/user/guard/access-token.guard';
import { RoleGuard } from 'src/user/guard/authorization.guard';
import { Like, FindOptionsWhere } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { Tag } from './entities/tag.entity';
import { TagService } from './tag.service';

@Controller('api/tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Version('1')
  @Get()
  async findAll(
    @Query('all') all: boolean,
    @Query() pagination: PaginationQueryDto,
    @Query('title') title?: string,
  ) {
    if (all) {
      const tags = await this.tagService.findAll(all, pagination, {
        title: title,
      });
      return { data: tags, count: tags.count };
    } else if (title === null || title === undefined || title === '') {
      return this.tagService.paginate(pagination);
    } else {
      const searchCriteria: FindOptionsWhere<Tag> = {
        title: Like(`%${title}%`),
      };

      return this.tagService.findAll(all, pagination, searchCriteria);
    }
  }
  @Version('1')
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.tagService.findOne(id);
  }
  // @Role(UserRole.ADMIN)
  // @UseGuards(AccessTokenGuard, RoleGuard)
  @Version('1')
  @Post()
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagService.create(createTagDto);
  }
  // @Role(UserRole.ADMIN)
  // @UseGuards(AccessTokenGuard, RoleGuard)
  @Version('1')
  @Patch(':id')
  update(@Param('id') id: number, @Body() createTagDto: CreateTagDto) {
    return this.tagService.update(id, createTagDto);
  }

  // @Role(UserRole.ADMIN)
  // @UseGuards(AccessTokenGuard, RoleGuard)
  @Version('1')
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.tagService.remove(id);
  }
}
