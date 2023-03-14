import { MessageService } from './message.service';
import {
  Controller,
  Body,
  Post,
  Get,
  Delete,
  Patch,
  Param,
  Version,
  UseGuards,
  Query,
  UsePipes,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { ValidationPipe } from '@nestjs/common/pipes';
import { IncomingHttpHeaders } from 'http2';
@Controller('api/message')
export class MessageController implements CanActivate {
  constructor(private messageService: MessageService) {}

  public async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const request = ctx.switchToHttp().getRequest<Request>();
    const requestBody: any = request.body;
    const requestHeaders: any = request.headers;

    console.log('BODY', requestBody);
    console.log('HEADERS', requestHeaders);
    return true;
  }

  @Version('1')
  @Post()
  async createMessage(@Body() createMessageDto: CreateMessageDto) {
    console.log('createMessage controller ::', createMessageDto);
    // const createMessageDto: CreateMessageDto = {
    //   senderId,
    //   receiverId,
    //   messageTitle,
    //   messageBody,
    // };
    const message = await this.messageService.createMessage(createMessageDto);
    return message;
  }

  @Version('1')
  @Get(':receiverId')
  async getMessagesByReceiverId(@Param('receiverId') receiverId: number) {
    const messages = await this.messageService.getMessagesByReceiverId(
      receiverId,
    );
    return messages;
  }

  @Version('1')
  @Patch(':messageId/read')
  async markMessageAsRead(@Param('messageId') messageId: number) {
    await this.messageService.markMessageAsRead(messageId);
  }
}
