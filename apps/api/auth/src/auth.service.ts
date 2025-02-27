import {
  AdminAddUserToGroupCommand,
  AdminRemoveUserFromGroupCommand,
  ChangePasswordCommand,
  CognitoIdentityProviderClient,
  ConfirmForgotPasswordCommand,
  ConfirmSignUpCommand,
  DescribeUserPoolCommand,
  ForgotPasswordCommand,
  GetUserCommand,
  GlobalSignOutCommand,
  InitiateAuthCommand,
  ResendConfirmationCodeCommand,
  SignUpCommand
} from '@aws-sdk/client-cognito-identity-provider';
import {Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {AuthenticateUserDto} from './dto/authenticate-user.dto';
import {ChangePasswordDto} from './dto/change-password.dto';
import {ForgotPasswordDto} from './dto/forgot-password.dto';
import {RegisterUserDto} from './dto/register-user.dto';

@Injectable()
export class AuthService {
  private readonly client: CognitoIdentityProviderClient;
  private readonly userPoolId = this.configService.get<string>('COGNITO_USER_POOL_ID')
  private readonly clientId = this.configService.get<string>('COGNITO_CLIENT_ID')
  private readonly clientSecret = this.configService.get<string>('COGNITO_CLIENT_SECRET')

  constructor(private readonly configService: ConfigService) {
    this.client = new CognitoIdentityProviderClient({region: this.configService.get<string>('COGNITO_REGION')});
  }

  private getSecretHash(username: string): string {
    const crypto = require('crypto');
    return crypto.createHmac('SHA256', this.clientSecret)
      .update(username + this.clientId)
      .digest('base64');
  }

  async signUp(user: RegisterUserDto) {
    const command = new SignUpCommand({
      ClientId: this.clientId,
      SecretHash: this.getSecretHash(user.email),
      Username: user.email,
      Password: user.password,
      UserAttributes: [
        {
          Name: 'email',
          Value: user.email,
        },
        {
          Name: 'name',
          Value: user.name,
        }
      ],
    });

    try {
      const response = await this.client.send(command);
      return response; // Retorna os dados do usuário criado
    } catch (error) {
      console.error("Erro durante o cadastro:", error);
      throw error; // Re-lança o erro para ser tratado no controller
    }
  }

  /**
   * 
   * @param email
   * @param code 
   * @returns 
   * Function to confirm the user's email by code
   */
  async confirmSignUp(email: string, code: string) {
    const command = new ConfirmSignUpCommand({
      ClientId: this.clientId,
      SecretHash: this.getSecretHash(email),
      Username: email,
      ConfirmationCode: code,
    });

    try {
      const response = await this.client.send(command);
      return response; // Retorna os dados do usuário criado
    } catch (error) {
      console.error("Erro durante a confirmação do cadastro:", error);
      throw error; // Re-lança o erro para ser tratado no controller
    }
  }

  async resendConfirmationCode(email: string) {
    const command = new ResendConfirmationCodeCommand({
      ClientId: this.clientId,
      SecretHash: this.getSecretHash(email),
      Username: email,
    });

    try {
      const response = await this.client.send(command);
      return response; // Retorna os dados do usuário criado
    } catch (error) {
      console.error("Erro durante o reenvio do código de confirmação:", error);
      throw error; // Re-lança o erro para ser tratado no controller
    }
  }

  async signIn(user: AuthenticateUserDto) {
    const command = new InitiateAuthCommand({
      ClientId: this.clientId,
      AuthFlow: 'USER_PASSWORD_AUTH',
      AuthParameters: {
        USERNAME: user.email,
        PASSWORD: user.password,
        SECRET_HASH: this.getSecretHash(user.email),
      },
    });
    const response = await this.client.send(command);
    return response; // Retorna os tokens (access token, id token)

  }

  async signOut(token: string) {
    const command = new GlobalSignOutCommand({
      AccessToken: token,
    });

    return this.client.send(command);
  }

  /**
   * 
   * @param token 
   * @returns 
   */

  async getUserDetails(token: string) {
    const command = new GetUserCommand({
      AccessToken: token,
    });

    return this.client.send(command);
  }

  async validateToken(token: string) {
    const command = new InitiateAuthCommand({
      AuthFlow: 'REFRESH_TOKEN_AUTH',
      ClientId: this.clientId, AuthParameters: {
        REFRESH_TOKEN: token,
      },
    });

    return this.client.send(command);
  }

  async refreshToken(refreshToken: string, username: string) {
    const command = new InitiateAuthCommand({
      AuthFlow: 'REFRESH_TOKEN_AUTH',
      ClientId: this.clientId,
      AuthParameters: {
        REFRESH_TOKEN: refreshToken,
        SECRET_HASH: this.getSecretHash(username),
      },
    });

    try {
      const response = await this.client.send(command);
      return response; // Retorna os novos tokens (access token, id token)
    } catch (error) {
      console.error("Erro durante a renovação do token:", error);
      throw error; // Re-lança o erro para ser tratado no controller
    }
  }

  async addUserToGroup(username: string, groupName: string): Promise<any> {
    const command = new AdminAddUserToGroupCommand({
      UserPoolId: this.userPoolId,
      Username: username,
      GroupName: groupName,
    });
    return this.client.send(command);
  }

  async removeUserFromGroup(username: string, groupName: string): Promise<any> {
    const command = new AdminRemoveUserFromGroupCommand({
      UserPoolId: this.userPoolId,
      Username: username,
      GroupName: groupName,
    });
    return this.client.send(command);
  }

  async changePassword(data: ChangePasswordDto): Promise<any> {
    const command = new ChangePasswordCommand({
      AccessToken: data.accessToken,
      PreviousPassword: data.oldPassword,
      ProposedPassword: data.newPassword,
    });
    return this.client.send(command);
  }

  async forgotPassword(username: string): Promise<any> {
    const command = new ForgotPasswordCommand({
      ClientId: this.clientId,
      Username: username,
      SecretHash: this.getSecretHash(username),
    });
    try {
      const response = await this.client.send(command);
      return response; // Retorna os dados do usuário cri
    } catch (error) {
      console.error("Erro durante a solicitação de redefinição de senha:", error);
      throw error; // Re-lança o erro para ser tratado no controller

    }
  }

  async resetPassword(data: ForgotPasswordDto): Promise<boolean> {
    const command = new ConfirmForgotPasswordCommand({
      ClientId: process.env.COGNITO_CLIENT_ID,
      SecretHash: this.getSecretHash(data.email),
      Username: data.email,
      ConfirmationCode: data.confirmationCode,
      Password: data.newPassword,
    });

    try {
      await this.client.send(command);
      return true; // Senha redefinida com sucesso
    } catch (error) {
      console.error('Erro ao redefinir senha:', error);
      return false;
    }
  }

  async getPasswordPolicy(): Promise<any> {
    const command = new DescribeUserPoolCommand({
      UserPoolId: this.userPoolId,
    });

    try {
      const response = await this.client.send(command);
      return response.UserPool?.Policies?.PasswordPolicy; // Retorna a política de senha
    } catch (error) {
      console.error("Erro ao buscar a política de senha:", error);
      throw error; // Re-lança o erro para ser tratado no controller
    }
  }
}
