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
import { Role } from 'src/user/decorators/role';
import { AccessTokenGuard } from 'src/user/guard/access-token.guard';
import { RoleGuard } from 'src/user/guard/authorization.guard';
import { UserRole } from 'src/user/entities/user.entity';
@Controller('api/message')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Role(UserRole.USER, UserRole.ADMIN)
  @UseGuards(AccessTokenGuard, RoleGuard)
  @Version('1')
  @Get('/inbox/:senderId')
  async getReceivedMessages(@Param('senderId') senderId: string) {
    return await this.messageService.getReceivedMessages(senderId);
  }

  @Version('1')
  @Post()
  async createMessage(
    @Body('messageTitle') messageTitle: string,
    @Body('messageBody') messageBody: string,
    @Body('senderId') senderId: string,
    @Body('receivers') receivers: string[],
  ) {
    const createMessageDto = {
      messageTitle,
      messageBody,
      senderId,
      receivers,
    };
    const message = await this.messageService.createMessage(createMessageDto);
    return message;
  }

  @Role(UserRole.USER, UserRole.ADMIN)
  @UseGuards(AccessTokenGuard, RoleGuard)
  @Version('1')
  @Get(':receiverId')
  async getMessagesByReceiverId(@Param('receiverId') receiverId: number) {
    const messages = await this.messageService.getMessagesByReceiverId(
      receiverId,
    );
    return messages;
  }

  @Role(UserRole.USER, UserRole.ADMIN)
  @UseGuards(AccessTokenGuard, RoleGuard)
  @Version('1')
  @Patch(':messageId/read')
  async markMessageAsRead(@Param('messageId') messageId: number) {
    await this.messageService.markMessageAsRead(messageId);
  }
}
