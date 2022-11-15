import { IsString, IsBoolean, IsDate, IsNotEmpty } from 'class-validator';
import { Column } from 'typeorm';
export class CreateArticleDto {
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  body: string;

  @IsBoolean()
  isPublished: boolean;

  @IsDate()
  publishedAt: Date;

  @Column()
  mainImageUrl: string;
}
