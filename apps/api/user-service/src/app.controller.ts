import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
@Controller()
export class AppController {
  @MessagePattern({ cmd: 'hello' })
  getHello(): string {
    return 'hello world - user-service';
  }
}
