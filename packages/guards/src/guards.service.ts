import {Injectable} from '@nestjs/common';

@Injectable()
export class CognitoAuthGuard {
  canActivate(context: any) {
    return true;
  }
}
