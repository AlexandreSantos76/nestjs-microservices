import {Injectable} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";

@Injectable()
export class CongnitoAuthGuard extends AuthGuard("jwt") {
  constructor() {
    super();
  }
}