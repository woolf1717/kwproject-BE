import { Module } from '@nestjs/common';
import { TypedEventEmitterModule } from '../event-emitter/typed-event-emitter.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypedEventEmitterModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
