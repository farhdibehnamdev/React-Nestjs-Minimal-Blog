import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFoundException extends HttpException {
  constructor() {
    super('email or password is incorrect', HttpStatus.NOT_FOUND);
  }
}
