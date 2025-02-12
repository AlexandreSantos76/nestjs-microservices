import {HttpException, HttpStatus, Logger, ValidationPipe} from '@nestjs/common';
import {HttpAdapterHost, NestFactory} from '@nestjs/core';
import {ValidationError} from 'class-validator';
import {AppModule} from './app.module';
import {HttpExceptionFilter} from './filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new HttpExceptionFilter(httpAdapterHost));
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    exceptionFactory: (errors: ValidationError[]) => {
      return new HttpException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Validation failed',
        errors: errors.map(error => ({
          property: error.property,
          constraints: error.constraints,
        })),
      }, HttpStatus.BAD_REQUEST);
    },
  }));

  const port = process.env.PORT ?? 9000;
  await app.listen(port);
  logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
