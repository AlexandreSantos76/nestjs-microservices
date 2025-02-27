import {Injectable} from '@nestjs/common';
import {CognitoOptions} from './interface/auth-options.interface';

@Injectable()
export class CognitoService {
  constructor(private readonly options: CognitoOptions) {}

  getOptions(): CognitoOptions {
    return this.options;
  }
}