import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/user/entities/user.entity';
import { FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';
import { BaseService } from 'src/common/Base.service';
import { PaginationQueryDto } from 'src/common/pagination-query.dto';

export class MessageViewDto {
  id: number;
  firstName: string;
  lastName: string;
  messageTitle: string;
  messageBody: string;
  receivedDate: Date;
}

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createMessage(createMessageDto: CreateMessageDto) {
    const message = new Message();

    message.messageTitle = createMessageDto.messageTitle;
    message.messageBody = createMessageDto.messageBody;
    message.readStatus = false;

    const sender = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id: createMessageDto.senderId })
      .getOne();
    console.log('sender ::', sender);
    if (!sender) throw new Error('Sender not found');

    message.sender = sender;
    const receivers = [];
    for (const receiverId of createMessageDto.receivers) {
      const receiver = await this.userRepository
        .createQueryBuilder('user')
        .where('user.id = :id', { id: receiverId })
        .getOne();

      if (!receiver)
        throw new Error(`Receiver with ID ${receiverId} not found`);

      receivers.push(receiver);
    }
    message.receivers = receivers;
    return await this.messageRepository.save(message);
  }

  async getReceivedMessages(id: string) {
    const messages = await this.messageRepository
      .createQueryBuilder('message')
      .leftJoinAndSelect('message.sender', 'sender')
      .leftJoinAndSelect('message.receivers', 'receiver')
      .where('receiver.id = :id', { id })
      .addSelect('sender.firstName', 'senderFirstName')
      .addSelect('sender.lastName', 'senderLastName')
      .getRawMany();

    const receivedMessages = messages.map((msg) => {
      let messageView = new MessageViewDto();
      (messageView.id = msg.message_id),
        (messageView.messageTitle = msg.message_messageTitle),
        (messageView.messageBody = msg.message_messageBody),
        (messageView.firstName = msg.senderFirstName),
        (messageView.lastName = msg.senderLastName),
        (messageView.receivedDate = msg.message_timeStamp);
      return messageView;
    });

    return { data: receivedMessages, count: receivedMessages.length };
  }

  async paginate(paginationQuery: PaginationQueryDto, id: string) {
    try {
      const { limit, offset } = paginationQuery;
      const newSkip = offset <= 1 ? 0 : (offset - 1) * limit;

      let options: FindManyOptions = {
        skip: newSkip,
        take: limit,
      };
      let { data, count } = await this.getReceivedMessages(id);

      data = data.slice(options.skip, options.skip + options.take);
      return { data, count };
    } catch (error) {
      throw new HttpException(
        'مشکلی در سرور رخ داده است لطفآ بعدآ دوباره تلاش نمایید',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(
    id: string,
    all: boolean,
    paginationQuery: PaginationQueryDto,
    searchCriteria: FindOptionsWhere<Message>,
  ) {
    if (all) {
      const { data, count } = await this.getReceivedMessages(id);
      return { data, count };
    } else {
      const { limit = 5, offset = 0 } =
        paginationQuery === undefined ? {} : paginationQuery;

      const newSkip = offset <= 1 ? 0 : (offset - 1) * limit;

      let options: FindManyOptions = {
        skip: newSkip,
        take: limit,
        where: searchCriteria,
      };

      let { data, count } = await this.getReceivedMessages(id);
      data = data.slice(options.skip, options.skip + options.take);
      if (!data) throw new NotFoundException("There isn't any Messages!!");
      return { data, count };
    }
  }

  async getMessagesByReceiverId(receiverId: number) {
    const messages = await this.messageRepository.find({
      where: { id: receiverId },
      order: { timeStamp: 'DESC' },
    });
    return messages;
  }

  async markMessageAsRead(messageId: number) {
    const message = await this.messageRepository
      .createQueryBuilder('message')
      .where('id= :id', { id: messageId })
      .getOne();
    message.readStatus = true;
    await this.messageRepository.save(message);
  }
}
