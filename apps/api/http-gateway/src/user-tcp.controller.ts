import {
    Controller,
    Post,
    Get,
    Body,
    Req,
    Inject,
    HttpStatus,
    HttpException,
} from '@nestjs/common';
import {
    ApiTags,
    ApiOkResponse,
    ApiCreatedResponse,
    ApiBearerAuth,
} from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
@Controller('users')
@ApiTags('users')
export class UserTcpController {
    constructor(@Inject('USER_SERVICE') private readonly user_client: ClientProxy) { }

    @Get("hello")
    hello(@Body() body: any) {
        return this.user_client.send(
            { cmd: 'hello' },
            body
        );
    }
}