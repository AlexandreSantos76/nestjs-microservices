import {ErrorHandlerModule} from '@fullcycle/common';
import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
@Module({
  imports: [
    ErrorHandlerModule,
    ConfigModule.forRoot(
      {
        isGlobal: true,
        envFilePath: '.env',
      }
    )],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}
