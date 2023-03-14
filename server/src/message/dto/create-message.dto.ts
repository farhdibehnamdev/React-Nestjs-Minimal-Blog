export class CreateMessageDto {
  readonly messageTitle: string;
  readonly messageBody: string;
  readonly senderId: string;
  readonly receiverId: string[];
}
