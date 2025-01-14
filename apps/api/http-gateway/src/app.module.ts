import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserTcpController } from './user-tcp.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

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
  providers: [AppService],
})
export class AppModule { }
