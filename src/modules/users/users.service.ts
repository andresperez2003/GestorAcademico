import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      username: 'test',
      password: bcrypt.hashSync('1234', 10), // Contraseña hasheada
    },
  ];

  async findOne(username: string) {
    return this.users.find((user) => user.username === username);
  }
}
