import { HttpException, HttpStatus } from '@nestjs/common';

export class UnverifiedUserException extends HttpException {
  constructor() {
    super('User not verified', HttpStatus.UNAUTHORIZED);
  }
}
