import {Controller} from '@nestjs/common';
import {MessagePattern, Payload} from '@nestjs/microservices';
import {AuthService} from './auth.service';
import {AuthenticateUserDto} from './dto/authenticate-user.dto';
import {ChangePasswordDto} from './dto/change-password.dto';
import {ConfirmUserDto} from './dto/confirm-user.dto';
import {ForgotPasswordDto} from './dto/forgot-password.dto';
import {RefreshTokenDto} from './dto/refresh-token.dto';
import {RegisterUserDto} from './dto/register-user.dto';
import {ResendConfirmationDto} from './dto/resend-confirmation.dto';


@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({
    cmd: 'SignUp',
  })
  async signUp(@Payload() data: RegisterUserDto) {
    return await this.authService.signUp(data);
  }

  @MessagePattern({
    cmd: 'ConfirmSignUp',
  })
  async confirmSignUp(@Payload() data: ConfirmUserDto) {
    return await this.authService.confirmSignUp(data.email, data.confirmationCode);
  }

  @MessagePattern({
    cmd: 'ResendConfirmationCode',
  })
  async resendConfirmationCode(@Payload() data: ResendConfirmationDto) {
    return await this.authService.resendConfirmationCode(data.email);
  }

  @MessagePattern({
    cmd: 'SignIn',
  })
  async signIn(@Payload() data: AuthenticateUserDto) {
    return await this.authService.signIn(data);
  }

  @MessagePattern({
    cmd: 'SignOut',
  })
  async signOut(@Payload() data: {token: string}) {
    return await this.authService.signOut(data.token);
  }

  @MessagePattern({
    cmd: 'GetUser',
  })
  async getUser(@Payload() data: {token: string}) {
    return await this.authService.getUserDetails(data.token);
  }

  @MessagePattern({
    cmd: 'RefreshToken',
  })
  async refreshToken(@Payload() data: RefreshTokenDto) {
    return await this.authService.refreshToken(data.refreshToken, data.username);
  }

  @MessagePattern({
    cmd: 'ForgotPassword',
  })
  async forgotPassword(@Payload() data: {email: string}) {
    return await this.authService.forgotPassword(data.email);
  }

  @MessagePattern({
    cmd: 'ConfirmForgotPassword',
  })
  async confirmForgotPassword(@Payload() data: ForgotPasswordDto) {
    return await this.authService.resetPassword(data);
  }

  @MessagePattern({
    cmd: 'ChangePassword',
  })
  async changePassword(@Payload() data: ChangePasswordDto) {
    return await this.authService.changePassword(data);
  }
}
