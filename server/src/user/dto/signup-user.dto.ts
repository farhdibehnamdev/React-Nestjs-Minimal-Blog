import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class SignUpUserDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(8)
  password: string;

  @IsString()
  @IsNotEmpty()
  @Length(8)
  confirmPassword: string;
}
