import { IsOptional, IsNumber, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @IsNumber()
  offset: number = 0;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  limit: number = 5;
}
