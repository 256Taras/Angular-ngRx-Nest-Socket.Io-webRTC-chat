import { Module } from '@nestjs/common';
import { ConversationService } from './services/conversation.service';
import { ConversationController } from './controller/conversation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Conversation from './entities/conversation.entity';
import { UserModule } from '../user/user.module';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports:[ TypeOrmModule.forFeature([Conversation]),
    UserModule,
    SharedModule],
  controllers: [ConversationController],
  providers: [ConversationService]
})
export class ConversationModule {}
