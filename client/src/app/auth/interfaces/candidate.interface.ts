import { FriendInterface } from '../../chat/models/interfaces/friend.interface';

export interface CandidateInterface extends FriendInterface{
  code?:number | null;
}

