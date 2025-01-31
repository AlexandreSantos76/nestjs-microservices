import {Controller} from '@nestjs/common';
import {MessagePattern} from '@nestjs/microservices';

@Controller()
export class AppController {
  @MessagePattern({cmd: 'hello'})
  getHello(data: any): string {  // Corrected: Accepting data argument
    console.log("Received data:", data); // Log the received data for debugging
    // Access the data from the body
    const name = data?.name; //example, if the body has the property name
    return `hello world - user-service ${name ? name : ''}`; // Corrected: Using received data
  }
}
