import {ArgumentsHost, Catch, ExceptionFilter, Logger} from '@nestjs/common';
import {RpcException} from '@nestjs/microservices';

@Catch(RpcException)
export class RpcExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(RpcExceptionFilter.name);

  catch(exception: RpcException, host: ArgumentsHost) {
    const errorResponse = exception.getError();
    this.logger.error(`RPC Exception: ${JSON.stringify(errorResponse)}`);

    return errorResponse;
  }
}