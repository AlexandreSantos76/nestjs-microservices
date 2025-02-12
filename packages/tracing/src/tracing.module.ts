import {ConfigModule} from "@fullcycle/config";
import {MiddlewareConsumer, Module, NestModule} from "@nestjs/common";
import {APP_INTERCEPTOR} from '@nestjs/core';

import {TcpLoggingInterceptor} from "./tracing.middleware";
import {Tracing} from "./trancing";

@Module({
  imports: [ConfigModule],
  providers: [
    Tracing,
    {
      provide: APP_INTERCEPTOR,
      useClass: TcpLoggingInterceptor,
    },
  ],
  exports: [Tracing],
})
export class TracingModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    // This module does not have any middleware
  }
}
