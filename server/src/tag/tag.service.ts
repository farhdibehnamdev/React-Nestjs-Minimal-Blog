import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/pagination-query.dto';
import { Like, Repository } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>,
  ) {}

  async paginate(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    const newSkip = offset * limit;
    const [tags, total] = await this.tagRepository.findAndCount({
      skip: newSkip,
      take: limit,
    });
    return { data: tags, count: total };
  }

  async findAll(paginationQuery: PaginationQueryDto, tagTitle: string) {
    const { limit, offset } = paginationQuery;
    const newSkip = offset * limit;
    const [tags, total] = await this.tagRepository.findAndCount({
      skip: newSkip,
      take: limit,
      where: [{ title: Like(`%${tagTitle}%`) }],
    });
    if (!tags) throw new NotFoundException("There isn't any Tags!!");
    return { data: tags, count: total };
  }

  async findOne(id: number) {
    const tag = await this.tagRepository.findOne({ where: { id } });
    if (!tag) throw new NotFoundException('Tag Not Found!!!');
    return tag;
  }

  async create(createTagDto: CreateTagDto) {
    const tag = this.tagRepository.create(createTagDto);
    return await this.tagRepository.save(tag);
  }

  async update(id: number, createTagDto: CreateTagDto) {
    const tag = await this.tagRepository.findOne({ where: { id } });
    if (!tag) throw new NotFoundException('Tag Not Found !!!');
    Object.assign(tag, createTagDto);
    return this.tagRepository.save(tag);
  }

  async remove(id: number) {
    const tag = await this.tagRepository.findOne({ where: { id } });
    if (!tag) throw new NotFoundException('Tag Not Found !!!');
    return this.tagRepository.remove(tag);
  }
}
