import {
  Controller,
  Get,
  Patch,
  Delete,
  Post,
  Param,
  Body,
} from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { TagService } from './tag.service';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  findAll() {
    return this.tagService.findAll();
  }

  @Get(':id')
  findOne(id: number) {
    return this.tagService.findOne(id);
  }

  @Post()
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagService.create(createTagDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() createTagDto: CreateTagDto) {
    return this.tagService.update(id, createTagDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.tagService.remove(id);
  }
}
