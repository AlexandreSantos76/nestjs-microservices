import {IsEmail, IsNotEmpty, IsString} from 'class-validator';

export class ConfirmUserDto {
  @IsNotEmpty()
  @IsString()
  confirmationCode: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
}