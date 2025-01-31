import {ClientProxy} from '@nestjs/microservices';
import {Test, TestingModule} from '@nestjs/testing';
import {of} from 'rxjs';
import {UserTcpController} from './user-tcp.controller';

describe('UserTcpController', () => {
  let userTcpController: UserTcpController;
  let clientProxy: ClientProxy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserTcpController],
      providers: [
        {
          provide: 'USER_SERVICE',
          useValue: {
            send: jest.fn().mockImplementation(() => of({message: 'Hello response'})),
          },
        },
      ],
    }).compile();

    userTcpController = module.get<UserTcpController>(UserTcpController);
    clientProxy = module.get<ClientProxy>('USER_SERVICE');
  });

  it('should send {name: "teste hello"} to USER_SERVICE and receive a response', (done) => {
    const body = {name: 'teste hello'};
    userTcpController.hello(body).subscribe((response) => {
      console.log('Received response:', response); // Adiciona esta linha para imprimir a resposta
      expect(response).toEqual({message: 'Hello response'});
      expect(clientProxy.send).toHaveBeenCalledWith({cmd: 'hello'}, body);
      done();
    });
  });
});