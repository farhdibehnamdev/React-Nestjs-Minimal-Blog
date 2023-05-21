import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
  isBoolean,
} from 'class-validator';

export class UserManagementDto {
  @IsString()
  id: string;
  @IsString()
  @IsNotEmpty()
  firstName: string;
  @IsString()
  @IsNotEmpty()
  lastName: string;
  @IsEmail()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
  @IsBoolean()
  isActive: boolean;
  @IsBoolean()
  isVerified: boolean;
  @IsString()
  userRole: string;
}

export class PatchUserManagementDto {
  @IsString()
  id: string;
  @IsString()
  @IsNotEmpty()
  firstName: string;
  @IsString()
  @IsNotEmpty()
  lastName: string;
  @IsEmail()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
  @IsBoolean()
  isActive: boolean;
  @IsBoolean()
  isVerified: boolean;
  @IsString()
  userRole: string;
}
