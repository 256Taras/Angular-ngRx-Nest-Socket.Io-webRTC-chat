import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { ConversationService } from '../services/conversation.service';
import { Request } from 'express';
import { CandidateIsUserGuard } from '../../auth/guard/candidate-is-user.guard';


@Controller('conversation')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {
  }



  @Post()
  @UseGuards(JwtAuthGuard)
  public create(
    @Req()req:Request,
    @Body('receiverId') receiverId: number,
  ) {

    const {id} = req.user['data']
    return this.conversationService.create(id, receiverId);
  }

  @Get()
  @UseGuards(JwtAuthGuard,CandidateIsUserGuard)
  public getMyConversation(@Req()req:Request) {
   //@ts-ignore
    const {id} = req.user['data']
    return this.conversationService.findAll(id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  public getMyChat(@Param('id') id: number) {

    return this.conversationService.findOne(+id);
  }


  @Delete(':id')
//  @UseGuards(JwtAuthGuard)
  public remove(@Param('id') id: string) {
    return this.conversationService.remove(+id);
  }
}
