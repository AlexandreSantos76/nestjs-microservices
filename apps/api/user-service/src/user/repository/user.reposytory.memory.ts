import {User} from '../entities/User';
import {UserRepository} from './user.repository';

export class UserRepositoryInMemory implements UserRepository {
  public users: User[] = [];

  async create(user: User): Promise<void> {
    this.users.push(user);
    console.log(`User <${user.name}> created in memory`);
  }
}