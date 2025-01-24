import { IsEmail, IsNotEmpty, IsString, IsBoolean, IsOptional } from '@nestjs/class-validator';

export class CreateUserDto {
    @IsEmail()
    readonly email: string;
    @IsString()
    @IsNotEmpty()
    readonly password: string;
    @IsString()
    readonly name: string;
    @IsString()
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
