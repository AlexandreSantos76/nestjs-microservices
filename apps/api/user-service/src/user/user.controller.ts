import {ErrorHandlerService} from '@fullcycle/common';
import {Controller, Logger} from '@nestjs/common';
import {MessagePattern, Payload} from '@nestjs/microservices';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {UserService} from './user.service';


@Controller()
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(
    private readonly userService: UserService,
    private readonly errorHandler: ErrorHandlerService

  ) {}

  @MessagePattern({cmd: 'createUser'})
  async create(@Payload() data: CreateUserDto) {
    try {
      return await this.userService.create(data);
    } catch (error) {
      this.errorHandler.handleDatabaseError(error);
    }
  }

  @MessagePattern({cmd: 'findAllUsers'})
  async findAll() {
    try {
      return await this.userService.findAll();
    } catch (error) {
      this.errorHandler.handleDatabaseError(error);
    }
  }

  @MessagePattern({cmd: 'findUserById'})
  async findById(@Payload() data: {id: number}) {
    try {
      return await this.userService.findById(data.id);
    } catch (error) {
      this.errorHandler.handleDatabaseError(error);
    }
  }

  @MessagePattern({cmd: 'findUserByEmail'})
  async findByEmail(@Payload() data: {email: string}) {
    try {
      return await this.userService.findByEmail(data.email);
    } catch (error) {
      this.errorHandler.handleDatabaseError(error);
    }
  }

  @MessagePattern({cmd: 'searchUsers'})
  async search(@Payload() data: {id?: number; email?: string; name?: string}) {
    try {
      return await this.userService.search(data);
    } catch (error) {
      this.errorHandler.handleDatabaseError(error);
    }
  }

  @MessagePattern({cmd: 'updateUser'})
  async update(@Payload() data: UpdateUserDto) {
    try {
      return await this.userService.update(data.id, data);
    } catch (error) {
      this.errorHandler.handleDatabaseError(error);
    }
  }

}
