import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import User from "./entities/user.entity";
import {SharedModule} from "../shared/shared.module";

@Module({
  imports:[TypeOrmModule.forFeature([User]),SharedModule],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService]
})
export class UserModule {}
