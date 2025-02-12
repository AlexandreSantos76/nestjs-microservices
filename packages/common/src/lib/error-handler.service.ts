import {HttpStatus, Injectable, Logger} from '@nestjs/common';
import {RpcException} from '@nestjs/microservices';

@Injectable()
export class ErrorHandlerService {
  private readonly logger = new Logger(ErrorHandlerService.name);

  handleDatabaseError(error: any): never {
    this.logger.error('Database error:', error);

    let message = 'Internal server error';
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

    if (error.code) {
      switch (error.code) {
        case 'P2002': // Unique constraint violation
          statusCode = HttpStatus.CONFLICT;
          message = `Unique constraint violation: ${error.meta?.target || 'unknown'}`;
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
          message = error.message || 'Unknown database error';
          break;
      }
    }

    throw new RpcException({message, statusCode, errors: []});
  }

  handleValidationError(errors: any[]): never {
    this.logger.warn('Validation failed', errors);

    const formattedErrors = errors.map((err) => ({
      property: err.property,
      constraints: err.constraints,
    }));

    throw new RpcException({
      statusCode: HttpStatus.BAD_REQUEST, // Use 422 para erros de validação
      message: 'Validation failed',
      errors: formattedErrors,
    });
  }
}
