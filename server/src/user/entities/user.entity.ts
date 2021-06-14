
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Conversation from '../../conversation/entities/conversation.entity';
import Message from '../../messages/entities/message.entity';



@Entity()
class User {
  @PrimaryGeneratedColumn()
  public  id: number;

  @Column({ nullable: true })
  public  nikname: string;

  @Column()
  public firstname: string;

  @Column()
  public  lastname: string;

  @Column({ nullable: true })
  public  avatar: string;

  @Column()
  public phone: string;

  @Column({ nullable: true })
  public code: number;

  @ManyToMany(() => Conversation, (conversation: Conversation) => conversation.users)
  public conversation: Conversation[];


  @OneToMany(type => Message, message => message.user)
  public messages: Message[];


}

export default User;
