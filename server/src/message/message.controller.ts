import { MessageService } from './message.service';
import {
  Controller,
  Body,
  Post,
  Get,
  Patch,
  Param,
  Version,
  UseGuards,
  Query,
} from '@nestjs/common';
import { Role } from 'src/user/decorators/role';
import { AccessTokenGuard } from 'src/user/guard/access-token.guard';
import { RoleGuard } from 'src/user/guard/authorization.guard';
import { UserRole } from 'src/user/entities/user.entity';
import { PaginationQueryDto } from 'src/common/pagination-query.dto';
import { FindOptionsWhere, Like } from 'typeorm';
import { Message } from './entities/message.entity';

type PaginationTitle = {
  pagination: PaginationQueryDto;
  title: string;
};

const paginationTitle: PaginationTitle = {
  pagination: { limit: 5, offset: 0 },
  title: '',
};
@Controller('api/message')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Role(UserRole.USER, UserRole.ADMIN)
  @UseGuards(AccessTokenGuard, RoleGuard)
  @Version('1')
  @Get('/inbox/:id')
  async getReceivedMessages(
    @Param('id') id: string,
    @Query('all') all: boolean,
    @Query() paginationTitle: PaginationTitle,
  ) {
    if (all) {
      const messages = await this.messageService.findAll(
        id,
        all,
        paginationTitle.pagination,
        {
          messageTitle: paginationTitle.title,
        },
      );
      return messages;
    } else if (
      paginationTitle.title === null ||
      paginationTitle.title === undefined ||
      paginationTitle.title === ''
    ) {
      return this.messageService.paginate(paginationTitle.pagination, id);
    } else {
      const searchCriteria: FindOptionsWhere<Message> = {
        messageTitle: Like(`%${paginationTitle.title}%`),
      };

      return this.messageService.findAll(
        id,
        all,
        paginationTitle.pagination,
        searchCriteria,
      );
    }
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
