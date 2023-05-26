import { IsEmail, IsString } from 'class-validator';

export class UserProfileDto {
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsString()
  newPasswrod: string;
}
