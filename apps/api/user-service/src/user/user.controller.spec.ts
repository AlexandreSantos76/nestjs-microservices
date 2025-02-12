import {Test, TestingModule} from '@nestjs/testing';
import {CreateUserDto} from './dto/create-user.dto';
import {UserController} from './user.controller';
import {UserService} from './user.service';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            create: jest.fn().mockResolvedValue('User created'),
          },
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
        name: 'Test User',
        isActive: true,
      };

      const result = await userController.create(createUserDto);
      expect(result).toBe('User created');
      expect(userService.create).toHaveBeenCalledWith(createUserDto);
    });
  });
});
