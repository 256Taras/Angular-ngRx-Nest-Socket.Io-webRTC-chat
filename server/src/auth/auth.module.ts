import {forwardRef, Module} from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import {AuthService} from "./service/auth.service";
import {JwtModule} from "@nestjs/jwt/dist/jwt.module";

import {JwtService} from "@nestjs/jwt";
import {JwtStrategy} from "./guard/jwt.strategy";
import {UserModule} from "../user/user.module";
import {SharedModule} from "../shared/shared.module";


@Module({
  imports:[
      UserModule,
      SharedModule
  ],
  controllers: [AuthController],
  providers:[AuthService,JwtStrategy],
  exports:[]
})
export class AuthModule {}
