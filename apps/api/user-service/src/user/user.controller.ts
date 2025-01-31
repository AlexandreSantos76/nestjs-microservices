import {Controller} from '@nestjs/common';
import {MessagePattern, Payload} from '@nestjs/microservices';
import {UpdateUserDto} from './dto/update-user.dto';
import {UserService} from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({cmd: 'createUser'})
  create(data: any) {
    console.log("Received data:", data); // Log the received data for debugging
    // Access the data from the body
    const name = data?.name; //example, if the body has the property name
    return `hello world - user-service:create ${name ? name : ''}`;
  }

  @MessagePattern('findAllUser')
  findAll() {
    return this.userService.findAll();
  }

  @MessagePattern('findOneUser')
  findOne(@Payload() id: number) {
    return this.userService.findOne(id);
  }

  @MessagePattern('updateUser')
  update(@Payload() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto.id, updateUserDto);
  }

  @MessagePattern('removeUser')
  remove(@Payload() id: number) {
    return this.userService.remove(id);
  }
}
