import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength
} from "class-validator";

export class RegisterUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  role?: string;

  @IsString()
  @MinLength(8, {message: 'A senha deve ter no mínimo 8 caracteres'})
  @Matches(/[a-z]/, {message: 'A senha deve conter pelo menos uma letra minúscula'})
  @Matches(/[A-Z]/, {message: 'A senha deve conter pelo menos uma letra maiúscula'})
  @Matches(/[0-9]/, {message: 'A senha deve conter pelo menos um número'})
  @Matches(/[\W_]/, {message: 'A senha deve conter pelo menos um caractere especial'})
  @IsNotEmpty()
  password: string;
}