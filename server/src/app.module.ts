import {Module} from '@nestjs/common';
import {UserModule} from './user/user.module';
import {DatabaseModule} from './database/database.module';
import {ConfigModule} from "@nestjs/config";
import {AuthModule} from './auth/auth.module';
import {SharedModule} from "./shared/shared.module";
import {ServeStaticModule} from '@nestjs/serve-static';
import { ConversationModule } from './conversation/conversation.module';
import { MessagesModule } from './messages/messages.module';
import * as path from 'path'


@Module({
    imports: [
        ServeStaticModule.forRoot({rootPath: path.resolve(__dirname, 'static')}),
        ConfigModule.forRoot({isGlobal: true}),
        UserModule,
        DatabaseModule,
        AuthModule,
        SharedModule,
        ConversationModule,
        MessagesModule,
    ],
    controllers: [],
    providers: [AuthService],
})
export class AppModule {
}
