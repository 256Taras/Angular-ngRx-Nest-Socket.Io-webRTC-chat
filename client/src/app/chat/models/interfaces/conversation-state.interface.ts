import { FriendInterface } from './friend.interface';

export interface ConversationStateInterface {
  id?:number;
  createdAt?:string;
  updatedAt?:string
  users:FriendInterface[]
}
