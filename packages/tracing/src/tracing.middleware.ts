import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable()
export class TcpLoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const clientData = context.switchToRpc().getData();

    console.log('Request received:', clientData);

    const now = Date.now();
    return next.handle().pipe(
      tap((response) => {
        console.log('Response sent:', response);
        console.log(`Request handled in ${Date.now() - now}ms`);
      }),
    );
  }
}