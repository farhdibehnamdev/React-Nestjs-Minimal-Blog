import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';

export class MessageViewDto {
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
      (messageView.messageTitle = msg.message_messageTitle),
        (messageView.messageBody = msg.message_messageBody),
        (messageView.firstName = msg.senderFirstName),
        (messageView.lastName = msg.senderLastName),
        (messageView.receivedDate = msg.message_timeStamp);
      return messageView;
    });
    return receivedMessages;
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
