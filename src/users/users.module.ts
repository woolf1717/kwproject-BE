import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { AnotherMiddlewareMiddleware } from './middlewares/another-middleware/another-middleware.middleware';
import { ExampleMiddleware } from './middlewares/example/example.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ExampleMiddleware)
      .forRoutes({ path: 'users', method: RequestMethod.GET })
      .apply(AnotherMiddlewareMiddleware)
      .forRoutes(UsersController);
  }
}
