import {Catch, ExceptionFilter, HttpException, HttpStatus} from '@nestjs/common';

@Catch(Error)
export class CognitoExceptionFilter implements ExceptionFilter {
  catch(exception: Error) {
    console.error('Erro Cognito');

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Erro interno no servidor';



    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      message = exception.getResponse() as string;

    }
    console.log('statusCode', exception.name);
    // Tratamento específico para erros do Cognito
    switch (exception.name) {
      case 'NotAuthorizedException':
        statusCode = HttpStatus.UNAUTHORIZED;
        message = 'Credenciais inválidas. Verifique seu e-mail e senha.';
        break;
      case 'UserNotFoundException':
        statusCode = HttpStatus.NOT_FOUND;
        message = 'Usuário não encontrado.';
        break;
      case 'InvalidParameterException':
        statusCode = HttpStatus.BAD_REQUEST;
        message = 'Parâmetros inválidos. Verifique os dados informados.';
        break;
      case 'CodeMismatchException':
        statusCode = HttpStatus.BAD_REQUEST;
        message = 'Código de verificação inválido. Tente novamente.';
        break;
      case 'ExpiredCodeException':
        statusCode = HttpStatus.BAD_REQUEST;
        message = 'O código de verificação expirou. Solicite um novo.';
        break;
      case 'PasswordResetRequiredException':
        statusCode = HttpStatus.FORBIDDEN;
        message = 'É necessário redefinir sua senha antes de continuar.';
        break;
      case 'LimitExceededException':
        statusCode = HttpStatus.TOO_MANY_REQUESTS;
        message = 'Muitas tentativas seguidas. Tente novamente mais tarde.';
        break;
      default:
        break;
    }

    return {
      statusCode,
      message: message,
      errors: []
    };
  }
}
