import {Module} from '@nestjs/common';
import {ClientsModule, Transport} from '@nestjs/microservices';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AuthTcpController} from './auth-tcp.controller';
import {UserTcpController} from './user-tcp.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.TCP,
        options: {
          port: 9001,
        },
      },
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: {
          port: 9002
        }
      }
    ]),

  ],
  controllers: [
    AppController,
    UserTcpController,
    AuthTcpController],
  providers: [
    AppService
  ],
})
export class AppModule {}
