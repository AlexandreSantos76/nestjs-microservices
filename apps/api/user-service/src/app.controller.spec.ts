import {ClientsModule, Transport} from '@nestjs/microservices';
import {Test, TestingModule} from '@nestjs/testing';
import {AppController} from './app.controller';
import {AppService} from './app.service';

describe('AppController', () => {
  let appController: AppController;
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
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
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('getHello', () => {
    it('should return "hello world - user-service"', () => {
      expect(appController.getHello({name: 'test'})).toBe('hello world - user-service test');
    });
  });
});