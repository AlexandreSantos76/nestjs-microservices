import {ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger} from '@nestjs/common';
import {HttpAdapterHost} from '@nestjs/core';
import {RpcException} from '@nestjs/microservices';
import {ObjectException} from '../interface/ObjectException';

@Catch(HttpException, RpcException, Object) // Capture ambos os tipos de exceção
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: HttpException | RpcException, host: ArgumentsHost) { // Tipo da exceção alterado
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    let status = HttpStatus.BAD_REQUEST; // Status correto
    let errorDetails;
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      this.logger.log("exception is HttpException");
      const exceptionResponse = exception.getResponse() as any;
      errorDetails = exceptionResponse.errors || {message: exception.message};
    } else if (exception instanceof RpcException) {
      status = HttpStatus.BAD_REQUEST; // Obtém o status do erro
      this.logger.log("exception is RpcException");
      const rpcError = exception.getError() as any; // Obtém o objeto de erro do RpcException
      if (rpcError && rpcError.error && rpcError.error.errors) { // Verifica se rpcError.error.errors existe
        errorDetails = rpcError.error.errors; // Acessa rpcError.error.errors
      } else if (rpcError && rpcError.error && rpcError.error.message) {
        errorDetails = {message: rpcError.error.message}
      } else {
        errorDetails = {message: exception.message}; // fallback para a mensagem padrão
      }

    } else {
      this.logger.log("exception is Object");
      try {
        const objectException = this.toInterface<ObjectException>(exception, ObjectException);
        status = objectException.statusCode;

        const formattedErrors = objectException.errors.map((err) => ({
          field: err.property,
          constraints: err.constraints,
        }));

        errorDetails = {
          message: objectException.message,
          details: formattedErrors,
        };
      } catch (error) {
        this.logger.error('Erro ao tratar exceção', error);
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        errorDetails = {
          message: 'Internal server error',
        };
      }
    }

    this.logger.error(`Http Exception: ${status} - ${request.method} ${request.url}`, exception.stack);

    response.status(status).json({
      statusCode: status,
      ...errorDetails,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
  toInterface<T>(obj: any, objetctError: new () => T): T {
    if (obj === null || obj === undefined) {
      throw new Error('O objeto não pode ser nulo ou indefinido.');
    }
    const instance = new objetctError();

    return obj as T;
  }
}