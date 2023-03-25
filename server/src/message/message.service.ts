import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createMessage(createMessageDto: CreateMessageDto) {
    console.log('createMessageDto ::', createMessageDto);
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
