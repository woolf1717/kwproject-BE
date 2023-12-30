import {
  Controller,
  // Get,
  Post,
  Body,
  // Patch,
  // Param,
  // Delete,
} from '@nestjs/common';
// import { UserService } from './user.service';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { TypedEventEmitter } from '../event-emitter/typed-event-emitter.class';

@Controller('user')
export class UserController {
  constructor(private readonly eventEmitter: TypedEventEmitter) {}

  @Post('sign-up')
  async create(@Body() body) {
    this.eventEmitter.emit('user.welcome', {
      name: 'Bhagyajit Jagdev',
      email: body.email,
    });

    this.eventEmitter.emit('user.verify-email', {
      name: 'Bhagyajit Jagdev',
      email: body.email,
      otp: '****', // generate a random OTP
    });
  }
}
