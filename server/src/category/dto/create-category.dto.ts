import { IsBoolean, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  title: string;

  @IsBoolean()
  isPublished: boolean;

  @IsString()
  description: string;
}
