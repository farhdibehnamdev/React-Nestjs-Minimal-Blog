import { IsString, IsBoolean, IsDate } from 'class-validator';
export class ArticleDto {
  @IsString()
  title: string;

  @IsString()
  slug: string;

  @IsString()
  body: string;

  @IsBoolean()
  isPublished: boolean;

  @IsDate()
  publishedAt: Date;
}
