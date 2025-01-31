import {PrismaService} from '@fullcycle/database';
import {User} from '../entities/User';

export class PrismaUserMapper {
  constructor(private readonly prisma: PrismaService) {}

  toPrisma(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      role: user.role,
    };
  }

  toDomain(user: any): User {
    return new User({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      role: user.role,
    });
  }
}