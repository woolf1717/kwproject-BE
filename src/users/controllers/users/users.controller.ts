import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from '../../dtos/CreateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';
import { UpdateUserDto } from 'src/users/dtos/UpdateUser.dto';
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('')
  getUser(@Query('sortDesc', ParseBoolPipe) sortDesc: boolean) {
    console.log(sortDesc);
    return this.userService.findUsers();
  }

  @Get('all')
  getUsers() {
    return this.userService.findUsers();
  }

  // @UseGuards(AuthGuard)
  @Get('posts')
  getUserPosts() {
    return [
      { title: 'test', content: 'test' },
      { title: 'test', content: 'test' },
    ];
  }

  @Get('posts/comments')
  getUserPostsComments() {
    return [{ content: 'test' }, { content: 'test' }];
  }

  @Post()
  createUser(@Body() userData: CreateUserDto) {
    return this.userService.createUser(userData);
  }

  @Put(':id')
  async updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    await this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUserById(@Param('id', ParseIntPipe) id: number) {
    await this.userService.deleteUser(id);
  }

  // @Post('create')
  // @UsePipes(new ValidationPipe())
  // createUser(@Body(ValidateCreateUserPipe) userData: CreateUserDto) {
  //   console.log(userData.age.toPrecision());
  //   return this.userService.createUser(userData);
  // }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    const user = this.userService.fetchUserById(id);
    if (!user)
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);

    return user;
  }

  @Get(':id/:postId')
  getUserByIdAndPostId(
    @Param('id', ParseIntPipe) id: string,
    @Param('postId') postId: string,
  ) {
    console.log(id, postId);
    return { id, postId };
  }
}
