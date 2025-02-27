import {Body, Controller, Inject, Logger, Post} from '@nestjs/common';
import {ClientProxy} from '@nestjs/microservices';
import {ApiTags} from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthTcpController {
  private readonly logger = new Logger(AuthTcpController.name);

  constructor(@Inject('AUTH_SERVICE') private readonly auth_client: ClientProxy) {}

  @Post('login')
  async login(@Body() body: any) {
    const response = await this.auth_client.send({cmd: 'SignIn'}, body);
    return response;
  }

  @Post('register')
  async register(@Body() body: any) {
    const response = await this.auth_client.send({cmd: 'SignUp'}, body);
    return response;
  }

  @Post('confirm')
  async confirm(@Body() body: any) {
    const response = await this.auth_client.send({cmd: 'ConfirmSignUp'}, body);
    return response;
  }

  @Post('resend-confirmation')
  async resendConfirmation(@Body() body: any) {
    const response = await this.auth_client.send({cmd: 'ResendConfirmationCode'}, body);
    return response;
  }

  @Post('logout')
  async logout(@Body() body: any) {
    const response = await this.auth_client.send({cmd: 'SignOut'}, body);
    return response;
  }

  @Post('user')
  async user(@Body() body: any) {
    const response = await this.auth_client.send({cmd: 'GetUser'}, body);
    return response;
  }

  @Post('refresh-token')
  async refreshToken(@Body() body: {refreshToken: string, email: string}) {
    const response = await this.auth_client.send({cmd: 'RefreshToken'}, body);
    return response;
  }

  @Post('forgot-password')
  async forgotPassword(@Body() body: any) {
    const response = await this.auth_client.send({cmd: 'ForgotPassword'}, body);
    return response;
  }

  @Post('change-password')
  async changePassword(@Body() body: any) {
    const response = await this.auth_client.send({cmd: 'ChangePassword'}, body);
    return response;
  }

}