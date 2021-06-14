import { Module } from '@nestjs/common';
import { MessagesGateway } from './gateway/messages.gateway';
import { MessagesService } from './services/messages.service';
import Message from './entities/message.entity';
import { TypeOrmModule } from '@nestjs/typeorm';



@Module({
  imports:[TypeOrmModule.forFeature([Message])],
  providers: [MessagesGateway, MessagesService]
})
export class MessagesModule {}
