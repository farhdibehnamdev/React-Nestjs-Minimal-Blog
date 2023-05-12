import { HttpException, HttpStatus } from '@nestjs/common';

export class UnAuthorizedException extends HttpException {
  constructor() {
    super('401 Unauthorized: Access Denied.', HttpStatus.UNAUTHORIZED);
  }
}
