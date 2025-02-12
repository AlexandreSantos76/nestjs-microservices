import {ErrorHandlerModule} from '@fullcycle/common';
import {DatabaseModule} from '@fullcycle/database';
import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UserController} from './user/user.controller';
import {UserService} from './user/user.service';
@Module({
  imports: [DatabaseModule, ErrorHandlerModule],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
