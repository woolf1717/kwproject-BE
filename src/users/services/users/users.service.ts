import { CreateUserType, UpdateUserType } from 'src/utils/types';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  private fakeUsers = [
    { username: 'fake', email: 'user' },
    { username: 'fake2', email: 'user2' },
    { username: 'fake3', email: 'user3' },
  ];

  findUsers() {
    return this.userRepository.find();
  }

  fetchUsers() {
    return this.fakeUsers;
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
