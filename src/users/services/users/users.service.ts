import { CreateUserType, UpdateUserType } from 'src/utils/types';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';

type ExampleUser = {
  userId: number;
  username: string;
  password: string;
};

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<ExampleUser | undefined> {
    return this.users.find((user) => user.username === username);
  }

  findUsers() {
    return this.userRepository.find();
  }

  createUser(userDetails: CreateUserType) {
    const newUser = this.userRepository.create({
      ...userDetails,
      createdAt: new Date(),
    });
    // this.fakeUsers.push(userDetails);
    return this.userRepository.save(newUser);
  }

  updateUser(id: number, updateUserDetails: UpdateUserType) {
    return this.userRepository.update({ id }, { ...updateUserDetails });
  }

  fetchUserById(id: number) {
    console.log(id);

    return null;
  }

  deleteUser(id: number) {
    return this.userRepository.delete({ id });
  }
}
