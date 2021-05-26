import {forwardRef, Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";

import {AuthController} from './controller/auth.controller';
import {AuthService} from "./service/auth.service";
import {JwtStrategy} from "./guard/jwt.strategy";
import {UserModule} from "../user/user.module";
import {SharedModule} from "../shared/shared.module";
import Candidate from "./entities/candidate.entity";
import {Twilio} from "twilio";
import {FileModule} from "../file/file.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Candidate]),
        UserModule,
        SharedModule,
    ],
    controllers: [AuthController],
    providers:
        [
            AuthService,
            JwtStrategy,
            {
                provide: 'SMS',
                useFactory: () => {
                    const accountSid = process.env.TWILIO_ACCOUNT_SID;
                    const authToken = process.env.TWILIO_AUTH_TOKEN;
                    return new Twilio(accountSid, authToken);
                }
            },

        ],
    exports: []
})
export class AuthModule {
}
