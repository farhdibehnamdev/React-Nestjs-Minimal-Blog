import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/category/entities/category.entity';
import { BaseService } from 'src/common/Base.service';
import { PaginationQueryDto } from 'src/common/pagination-query.dto';
import { Tag } from 'src/tag/entities/tag.entity';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import Article from './entities/article.entity';
import * as moment from 'moment';
import User from 'src/user/entities/user.entity';

const fileMimeTypes = {
  'image/png': '.png',
  'image/jpg': '.jpg',
};

@Injectable()
export class ArticleService extends BaseService<Article> {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super(articleRepository);
  }

  async findOne(id: number) {
    const article = await this.articleRepository.findOne({
      where: { id },
    });
    if (!article) {
      throw new NotFoundException(`We couldn't find your article!!`);
    }
    return article;
  }

  async create(createArticleDto: CreateArticleDto, file: any) {
    const tags = await Promise.all(
      createArticleDto.tags.map(async (tag) => {
        return this.tagRepository.findOne({ where: { id: Number(tag) } });
      }),
    );

    const titleSplited = createArticleDto.title.split(' ');
    const slug = titleSplited.join('-');

    const article = this.articleRepository.create({
      ...createArticleDto,
      tags,
    });
    article.slug = slug;
    const publishedAtString = moment(
      createArticleDto.publishedAt || new Date(),
      ['DD-MM-YYYY', 'YYYY-MM-DD'],
    ).format('YYYY-MM-DD');

    article.publishedAt = new Date(publishedAtString);

    const mimetype = file.image.mimetype;
    const filename = file.image.filename + fileMimeTypes[mimetype];
    const manipulateFile = { ...file, image: file.image, filename };

    if (file) {
      article.image = manipulateFile;
    }
    return this.articleRepository.save(article);
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    const tags =
      updateArticleDto.tags &&
      (await Promise.all(
        updateArticleDto.tags.map((tag) => this.preloadTagsByName(tag)),
      ));

    const article = await this.articleRepository.preload({
      id: +id,
      ...updateArticleDto,
      tags,
    });

    if (!article) {
      throw new NotFoundException('مقاله ای یافت');
    }

    return this.articleRepository.save(article);
  }

  async remove(id: number) {
    const article = await this.articleRepository.findOne({
      where: { id },
    });
    return this.articleRepository.remove(article);
  }

  private async preloadTagsByName(title: string): Promise<Tag> {
    const existingTags = await this.tagRepository.findOne({
      where: { title },
    });
    if (existingTags) return existingTags;
    return this.tagRepository.create({ title });
  }
}
