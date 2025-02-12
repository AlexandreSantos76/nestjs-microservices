import {ArgumentsHost, Catch, ExceptionFilter, HttpStatus} from '@nestjs/common';
import {RpcException} from '@nestjs/microservices';

@Catch()
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToRpc();
    const response = ctx.getData();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    if (exception instanceof RpcException) {
      message = exception.message;
    }
    // Verifica se é um erro do Prisma baseado em `code` (ou outras características conhecidas)
    else if (exception.code) {
      switch (exception.code) {
        case 'P2002': // Unique constraint violation
          statusCode = HttpStatus.CONFLICT;
          message = `Unique constraint violation: ${exception.meta?.target || 'unknown'}`;
          break;
        case 'P2025': // Record not found
          statusCode = HttpStatus.NOT_FOUND;
          message = 'Record not found';
          break;
        case 'P2003': // Foreign key constraint violation
          statusCode = HttpStatus.BAD_REQUEST;
          message = 'Foreign key constraint violation';
          break;
        default:
          message = exception.message || 'Unknown database error';
          break;
      }
    }
    // Caso o erro não tenha `code` ou não seja HttpException, trata como erro genérico
    else {
      message = exception.message || 'An unexpected error occurred';
    }

    return {
      statusCode,
      message: message,
      errors: []
    };
  }
}
