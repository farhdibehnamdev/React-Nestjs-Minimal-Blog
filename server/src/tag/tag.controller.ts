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
import { Role } from 'src/user/decorators/role';
import { UserRole } from 'src/user/entities/user.entity';
import { AccessTokenGuard } from 'src/user/guard/access-token.guard';
import { RoleGuard } from 'src/user/guard/authorization.guard';
import { CreateTagDto } from './dto/create-tag.dto';
import { TagService } from './tag.service';

@Controller('api/tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Version('1')
  @Get()
  findAll() {
    return this.tagService.findAll();
  }
  @Version('1')
  @Get(':id')
  findOne(id: number) {
    return this.tagService.findOne(id);
  }
  @Role(UserRole.ADMIN)
  @UseGuards(AccessTokenGuard, RoleGuard)
  @Version('1')
  @Post()
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagService.create(createTagDto);
  }
  @Role(UserRole.ADMIN)
  @UseGuards(AccessTokenGuard, RoleGuard)
  @Version('1')
  @Patch(':id')
  update(@Param('id') id: number, @Body() createTagDto: CreateTagDto) {
    return this.tagService.update(id, createTagDto);
  }

  @Role(UserRole.ADMIN)
  @UseGuards(AccessTokenGuard, RoleGuard)
  @Version('1')
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.tagService.remove(id);
  }
}
