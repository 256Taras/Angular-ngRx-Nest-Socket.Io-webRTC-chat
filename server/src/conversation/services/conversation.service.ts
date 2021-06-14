import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Conversation from '../entities/conversation.entity';
import { Repository } from 'typeorm';
import { UserService } from '../../user/service/user.service';

import User from '../../user/entities/user.entity';


@Injectable()
export class ConversationService {
  constructor(
    @InjectRepository(Conversation) private readonly conversationRepository: Repository<Conversation>,
    private userService: UserService,
  ) {
  }


  public async findAll(id: number): Promise<Conversation[]> {


    //шукаю всі бесіди де є ід користувача
    const userCnv = await this.conversationRepository
      .createQueryBuilder('cnv')
      .leftJoinAndSelect('cnv.users', 'user')
      .where('user.id = :id', { id })
      .getMany();

    if (userCnv.length === 0) {
      return [];
    }

    //перешукую бесіди щоб побачити з ким спілкуюється користувач
    const convAndFriends= await  this.conversationRepository
      .createQueryBuilder('cnv')
      .whereInIds(userCnv.map(el => el.id))
      .leftJoinAndSelect('cnv.users', 'user', 'user.id != :id', { id })
      .getMany();
    //видаляєм поле код
      convAndFriends.forEach((cnv:Conversation)=>{
      cnv.users.forEach((user:User)=>{
        delete user.code
      })
    })

    return convAndFriends
  }

  public async findOne(id: number): Promise<Conversation> {
    return await this.conversationRepository
      .createQueryBuilder('cnv')
      .where('cnv.id =:id', { id })
      .getOne();
  }

  public async create(senderId: number, receiverId: number): Promise<Conversation> {
    try {

      let conversation: Conversation;
      let isTwoUserInConversation: boolean = false;

      if (!senderId || !receiverId) {
        throw new HttpException('Не указано ід!', HttpStatus.BAD_REQUEST);
      } else if (senderId === receiverId) {
        throw new HttpException('Не можливо зстилатися на самого себе', HttpStatus.BAD_REQUEST);
      }


      const findConversationsWidthCandidates = await this.conversationRepository
        .createQueryBuilder('conversation')
        .leftJoinAndSelect('conversation.users', 'u', 'u.id IN (:...ids)', { ids: [senderId, receiverId] })
        .getMany();
      //Проходимся по всіх що є в базі бесідах берем масиви user:[u1,u2]
      const allUsers = findConversationsWidthCandidates.map(cnv => cnv.users);


      //перевіряєм чи в масиві є 2 користувача
      const findConversation = allUsers.map((u, i) => {
        if (u.length === 2) {
          isTwoUserInConversation = true;
          conversation = findConversationsWidthCandidates[i];
        }
        if (u.length ===0){
          isTwoUserInConversation = true;
        }
      });

      if (conversation) {
        return conversation;
      }
      if (!isTwoUserInConversation) {
        throw  new HttpException('Юзера не найдено', HttpStatus.NOT_FOUND);
      }

      const users = await this.userService.findUsersByIds([senderId, receiverId]);
      return await this.conversationRepository.save({ users });

    } catch (e) {

      throw  new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


 public async remove(id: number) {
    return await this.conversationRepository.delete(id)
  }
}
