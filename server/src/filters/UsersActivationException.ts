import { HttpException, HttpStatus } from '@nestjs/common';

export class UsersActivationException extends HttpException {
  constructor() {
    super('User account is deactivated or not verified.', HttpStatus.FORBIDDEN);
  }
}
