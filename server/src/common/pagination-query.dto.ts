import { IsOptional, IsNumber, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  limit: number = 5;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  offset: number = 1;
}
