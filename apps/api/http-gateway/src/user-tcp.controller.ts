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
    constructor(@Inject('USER_SERVICE') private readonly client: ClientProxy) { }

    @Get()
    async hello(@Req() req: any) {
        try {
            const result = await this.client.send({ cmd: 'hello' }, {});
            return result;
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}