import { IsBoolean, IsEmail, IsNotEmpty } from 'class-validator';

export class SigninUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsBoolean()
  rememberMe: boolean;
}
