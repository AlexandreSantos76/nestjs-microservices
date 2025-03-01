import {ArgumentsHost, Catch, RpcExceptionFilter} from '@nestjs/common';
import {RpcException} from '@nestjs/microservices';
import {Observable, throwError} from 'rxjs';

@Catch(RpcException)
export class ExceptionFilter implements RpcExceptionFilter<RpcException> {
  catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
    console.error('ExceptionFilter', exception.getError());
    return throwError(() => exception.getError());
  }
}