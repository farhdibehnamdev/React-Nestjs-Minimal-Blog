import { IsBoolean, isBoolean, IsString } from 'class-validator';

export class UpdateCategoryDto {
  @IsString()
  title: string;

  @IsBoolean()
  isPublished: boolean;

  @IsString()
  description: string;
}
