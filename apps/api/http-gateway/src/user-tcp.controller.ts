import {Body, Controller, Get, Inject, Post} from '@nestjs/common';
import {ClientProxy} from '@nestjs/microservices';
import {ApiTags} from '@nestjs/swagger';

@Controller('users')
@ApiTags('users')
export class UserTcpController {
  constructor(@Inject('USER_SERVICE') private readonly user_client: ClientProxy) {}

  @Get("hello")
  hello(@Body() body: any) {
    // Send the body data as part of the message payload
    return this.user_client.send({cmd: 'hello'}, body); // Corrected: Sending body as payload
  }
  @Post('register')
  register(@Body() body: any) {
    return this.user_client.send({cmd: 'createUser'}, body); // Corrected: Sending body as payload
  }
}