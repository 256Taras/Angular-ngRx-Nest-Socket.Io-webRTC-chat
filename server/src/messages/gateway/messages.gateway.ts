import { OnGatewayInit } from '@nestjs/websockets';
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayDisconnect,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { MessagesService } from '../services/messages.service';
import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway()
export class MessagesGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private rooms = {};
  private logger: Logger = new Logger('ChatGateway');


  constructor(private readonly messagesService: MessagesService) {
  }


  private pushToRoom(room: string, client: any) {
    if (!this.rooms[room]) {
      this.rooms[room] = [];
    }
    this.rooms[room].push(client);
    console.log(this.rooms);
    return this.rooms[room];
  }

  private deleteFromRoom(room: string, client: any) {
    return this.rooms[room] = this.rooms[room].filter(el => el.id !== client.id);
  }


  private roomClients = (room:string) => {
    if(this.rooms[room]){
      return this.rooms[room]
    }
    return []
  }

  public afterInit(server: Server) {
    this.logger.log('Init');
  }


  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): void {

  }

  public async handleConnection(client: Socket, ...args: any[]) {

  }

  public async handleDisconnect(client: Socket) {

  }
}
