import { IsBoolean, IsString } from 'class-validator';
export class CreateTagDto {
  @IsString()
  title: string;

  @IsBoolean()
  isPublished: boolean;

  @IsString()
  description: string;
}
