import {User} from '../entities/User';
import {UserRepository} from './user.repository';

export class DatabaseRepository implements UserRepository {
  async create(user: User): Promise<void> {
    console.log(`User <  > created in database`);
  }
}