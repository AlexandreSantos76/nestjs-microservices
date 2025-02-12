import {Controller} from '@nestjs/common';
import {MessagePattern, RpcException} from '@nestjs/microservices';
@Controller()
export class AppController {
  @MessagePattern({cmd: 'hello'})
  async getHello(data: {name: string}): Promise<string> {
    // Corrected: Accepting data argument
    try {
      console.log("Receiveda data:", data); // Log the received data for debugging
      // Access the data from the body

      if (!data.name) {
        throw new RpcException({
          message: 'Erro internadfafadsfafdsfaidor',
          statusCode: 400,
        });
      }
      const response = `hello world - user-service ${data.name}`;
      console.log(response); // Log the response for debugging
      //example, if the body has the property name
      return response;
    } catch (error) {
      throw new RpcException({
        message: error.message || 'Erro internadfafadsfafdsfaidor',
        statusCode: error.status || 500,
      });
    }
  }

}
