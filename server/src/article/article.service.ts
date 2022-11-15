import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/category/entities/Category.entity';
import { Tag } from 'src/tag/entities/tag.entity';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import Article from './entities/article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  findAll() {
    throw new Error('not implemented');
  }

  async findOne(id: string) {
    const article = await this.articleRepository.findOne({
      where: { id: parseInt(id, 10) },
    });
    if (!article) {
      throw new NotFoundException(`We couldn't find your article!!`);
    }
    return article;
  }

  async create(createArticleDto: CreateArticleDto) {
    const category = await Promise.call(
      this.preloadCategoryByName(createArticleDto.category),
    );

    const tags = await Promise.all(
      createArticleDto.tags.map((tag) => this.preloadTagsByName(tag)),
    );

    const article = this.articleRepository.create({
      ...createArticleDto,
      category,
      tags,
    });
    return this.articleRepository.save(article);
  }
  private async preloadTagsByName(title: string): Promise<Tag> {
    const existingTags = await this.tagRepository.findOne({
      where: { title },
    });
    if (!existingTags) return existingTags;
    return this.tagRepository.create({ title });
  }

  private async preloadCategoryByName(title: string): Promise<Category> {
    const existingCategory = await this.categoryRepository.findOne({
      where: { title },
    });
    if (existingCategory) return existingCategory;

    return this.categoryRepository.create({ title });
  }
}
