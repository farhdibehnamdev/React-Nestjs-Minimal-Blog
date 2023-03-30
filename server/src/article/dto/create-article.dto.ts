import {
  IsString,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsUUID,
} from 'class-validator';

export class CreateArticleDto {
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  body: string;

  @IsBoolean()
  isPublished: boolean;

  @IsString()
  publishedAt: string;

  @IsString()
  image: string;

  @IsNumber()
  categoryId: number;

  @IsUUID()
  userId: string;

  @IsString({ each: true })
  tags: string[];
}
