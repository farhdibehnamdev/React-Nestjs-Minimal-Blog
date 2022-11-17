import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class SignUpUserDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @Length(8)
  password: string;

  @IsString()
  @Length(8)
  passwordConfirm: string;
}
