import {UserRepositoryInMemory} from '../repository/user.reposytory.memory';
import {CreateUserUseCase} from './createUserUseCase';

let createUserUseCase: CreateUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;

describe('CreateUserUseCase', () => {


  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });

  it('should create a new user', async () => {
    expect(userRepositoryInMemory.users).toEqual([])
    const user = await createUserUseCase.execute({
      name: 'John Doe',
      email: 'teste@test.com',
      role: 'admin',
      isActive: true
    });
    expect(userRepositoryInMemory.users).toEqual([user])
  });

});
