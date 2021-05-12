import { Injectable } from '@nestjs/common';
import {UserInterface} from "../entities/user.interface";
import {InjectRepository} from "@nestjs/typeorm";
import User from "../entities/user.entity";
import {Repository} from "typeorm";
import { from, Observable } from 'rxjs';
;

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private readonly  userRepository:Repository<User>) {
  }

  create(candidate: UserInterface):Observable<User> {
    return from(this.userRepository.save(candidate))
  }

  findAll():Observable<User[]>  {
    return from(this.userRepository.find())
  }

  findOne(id: number) {
    return from(this.userRepository.findOne({id}))
  }

  update(id: number, updateUserDto: UserInterface) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return from(this.userRepository.findOne({id}))
  }
}
