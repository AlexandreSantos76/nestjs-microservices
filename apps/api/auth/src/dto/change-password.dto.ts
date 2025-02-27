import {IsNotEmpty, IsString} from 'class-validator';

export class ChangePasswordDto {
  @IsNotEmpty()
  @IsString()
  accessToken: string;
  @IsNotEmpty()
  @IsString()
  newPassword: string;
  @IsNotEmpty()
  @IsString()
  oldPassword: string;
}