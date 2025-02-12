import {Injectable} from '@nestjs/common';
import {User} from '../entities/User';
import {UserRepository} from '../repository/user.repository';

interface CreateUserRequest {
  name: string;
  email: string;
  role: string;
  isActive: boolean;
}

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}
  async execute({name, email, role, isActive}: CreateUserRequest) {
    const user = new User({
      name,
      email,
      role,
      isActive
    });
    await this.userRepository.create(user);

    return user;
  }
}