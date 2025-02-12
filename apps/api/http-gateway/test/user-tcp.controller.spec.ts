import {ClientProxy} from '@nestjs/microservices';
import {Test, TestingModule} from '@nestjs/testing';
import {UserTcpController} from '../src/user-tcp.controller';

describe('UserTcpController', () => {
  let controller: UserTcpController;
  let clientProxyMock: ClientProxy;

  beforeEach(async () => {
    clientProxyMock = {
      send: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserTcpController],
      providers: [
        {
          provide: 'USER_SERVICE',
          useValue: clientProxyMock,
        },
      ],
    }).compile();

    controller = module.get<UserTcpController>(UserTcpController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call clientProxy.send with correct payload on hello', () => {
    const body = {message: 'Hello'};
    controller.hello(body);
    expect(clientProxyMock.send).toHaveBeenCalledWith({cmd: 'hello'}, body);
  });

  it('should call clientProxy.send with correct payload on register', () => {
    const body = {email: 'test@example.com', password: 'password'};
    controller.register(body);
    expect(clientProxyMock.send).toHaveBeenCalledWith({cmd: 'createUser'}, body);
  });
});
