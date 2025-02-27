import {DynamicModule, Global, Module} from '@nestjs/common';
import {CognitoService} from './cognito.service';
import {CognitoOptions} from './interface/auth-options.interface';
@Global()
@Module({})
export class CognitoModule {
  static register(options: CognitoOptions): DynamicModule {
    return {
      module: CognitoModule,
      providers: [
        {
          provide: 'COGNITO_OPTIONS',
          useValue: options,
        },
        CognitoService,
      ],
      exports: [CognitoService],
    };
  }
}
