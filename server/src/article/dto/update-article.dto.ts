import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';

export class UpdateArticleDto {
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
  mainImageUrl: string;

  @IsNumber()
  categoryId: number;

  @IsUUID()
  userId: string;

  @IsString({ each: true })
  tags: string[];
}
