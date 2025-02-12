
import {ErrorHandlerService, RpcExceptionFilter} from '@fullcycle/common';
import {ValidationPipe} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import {MicroserviceOptions, Transport} from '@nestjs/microservices';
import 'tsconfig-paths/register';
import {AppModule} from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        port: 9001
      }
    },
  );
  const errorHandler = app.get(ErrorHandlerService);
  app.useGlobalPipes(new ValidationPipe(
    {
      transform: true,
      whitelist: false,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      disableErrorMessages: true,
      exceptionFactory: (errors) => errorHandler.handleValidationError(errors),
    }
  ));
  app.useGlobalFilters(new RpcExceptionFilter());
  await app.listen();
}
bootstrap();
