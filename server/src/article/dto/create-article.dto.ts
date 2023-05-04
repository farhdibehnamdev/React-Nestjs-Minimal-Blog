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

  @IsString()
  body: string;

  @IsBoolean()
  isPublished: boolean;

  @IsString()
  publishedAt?: string;

  @IsNumber()
  categoryId: number;

  @IsUUID()
  userId: string;

  @IsString({ each: true })
  tags: string[];
}
