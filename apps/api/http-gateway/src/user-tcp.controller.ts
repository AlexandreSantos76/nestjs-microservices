import {Body, Controller, Get, Inject, Logger, Param, Post, Put} from '@nestjs/common';
import {ClientProxy} from '@nestjs/microservices';
import {ApiTags} from '@nestjs/swagger';

@Controller('users')
@ApiTags('users')
export class UserTcpController {
  private readonly logger = new Logger(UserTcpController.name);

  constructor(@Inject('USER_SERVICE') private readonly user_client: ClientProxy) {}

  @Get("hello")
  async hello(@Body() body: any) {
    const response = await this.user_client.send({cmd: 'hello'}, body);
    return response;
  }

  @Post('register')
  async register(@Body() body: any) {
    const response = await this.user_client.send({cmd: 'createUser'}, body);
    return response;
  }

  @Get('list')
  async list() {
    const response = await this.user_client.send({cmd: 'findAllUsers'}, {});
    return response;
  }

  @Get('search/:id')
  async search(@Param('id') id: number) {
    const response = await this.user_client.send({cmd: 'findUserById'}, {id});
    return response;
  }

  @Get('search/:email')
  async searchByEmail(@Param('email') email: string) {
    const response = await this.user_client.send({cmd: 'findUserByEmail'}, {email});
    return response;
  }

  @Get('search')
  async searchByQuery(@Param('id') id: number, @Param('email') email: string, @Param('name') name: string) {
    const response = await this.user_client.send({cmd: 'searchUsers'}, {id, email, name});
    return response;
  }

  @Put('update/:id')
  async update(@Param('id') id: number, @Body() body: any) {
    const response = await this.user_client.send({cmd: 'updateUser'}, {id, ...body});
    return response;
  }
}