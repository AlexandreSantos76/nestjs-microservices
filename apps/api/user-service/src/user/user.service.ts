import {PrismaService} from '@fullcycle/database';
import {Injectable, Logger} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {User} from './entities/User';
@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(private readonly prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        isActive: createUserDto.isActive
      },
    });
    return new User(user)
  }
  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users.map(user => new User(user))
  }

  async findById(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id
      }
    })
    return new User(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: {
        email: email
      }
    })
    return new User(user);
  }

  async search(params: {id?: number; email?: string; name?: string}): Promise<User[]> {
    const {id, email, name} = params;

    const users = await this.prisma.user.findMany({
      where: {
        AND: [
          id ? {id} : undefined,
          email ? {email: {contains: email, mode: "insensitive"}} : undefined,
          name ? {name: {contains: name, mode: "insensitive"}} : undefined,
        ].filter(Boolean) as any, // Remove undefined para evitar erro no Prisma
      },
    });

    return users.map((user) => new User(user));
  }

  async existsByEmail(email: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: {email},
      select: {id: true}, // Retorna apenas o ID para otimizar a consulta
    });

    return !!user; // Retorna `true` se encontrou um usuário, senão `false`
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.update({
      where: {id},
      data: {
        name: updateUserDto.name,
        email: updateUserDto.email,
        isActive: updateUserDto.isActive,
        role: updateUserDto.role
      },
    });
    return new User(user);
  }

  async remove(id: number): Promise<void> {
    await this.prisma.user.delete({
      where: {id}
    });
  }
}
