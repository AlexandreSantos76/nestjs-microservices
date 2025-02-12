import {IsEmail, IsNotEmpty, IsOptional, IsString, MinLength} from 'class-validator';

export class CreateUserDto {
  constructor(partial: Partial<CreateUserDto>) {
    Object.assign(this, partial);
  }

  @IsEmail({}, {message: 'Email inválido'})
  @IsNotEmpty({message: 'Email é obrigatório'})
  readonly email: string;
  @IsNotEmpty({message: 'Nome é obrigatório'})
  @IsString({message: 'Nome inválido'})
  @MinLength(3, {message: 'Nome deve ter no mínimo 3 caracteres'})
  readonly name: string;
  @IsString({message: 'Role inválida'})
  @IsOptional()
  readonly role?: RoleEnum;
  @IsNotEmpty()
  readonly isActive: boolean;

}

enum RoleEnum {
  SUPER = 'super',
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest'
}
