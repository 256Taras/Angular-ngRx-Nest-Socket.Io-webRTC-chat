import {Module} from '@nestjs/common';
import {UserModule} from './user/user.module';
import {DatabaseModule} from './database/database.module';
import {ConfigModule} from "@nestjs/config";
import { AuthService } from './auth/service/auth.service';
import { AuthModule } from './auth/auth.module';
import {SharedModule} from "./shared/shared.module";


@Module({
    imports: [ConfigModule.forRoot({
        isGlobal: true
    }), UserModule, DatabaseModule, AuthModule, SharedModule ],
    controllers: [],
    providers: [AuthService],
})
export class AppModule {
}
