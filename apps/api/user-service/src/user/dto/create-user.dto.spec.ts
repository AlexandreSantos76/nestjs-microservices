import {validate} from 'class-validator';
import {CreateUserDto} from './create-user.dto';

describe('CreateUserDto', () => {
  it('should validate a correct DTO', async () => {
    const dto = new CreateUserDto({
      email: 'test@example.com',
      name: 'Test User',
      isActive: true,
    });

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should not validate an incorrect DTO', async () => {
    const dto = new CreateUserDto({
      email: 'invalid-email',
      name: '',
      isActive: null,
    });

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
});
