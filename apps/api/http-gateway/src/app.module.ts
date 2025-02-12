import {Module} from '@nestjs/common';
import {ClientsModule, Transport} from '@nestjs/microservices';
import {AppController} from './app.controller';
import {AppService} from './app.service';
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
    ]),

  ],
  controllers: [AppController, UserTcpController],
  providers: [
    AppService
  ],
})
export class AppModule {}
