
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Conversation from '../../conversation/entities/conversation.entity';
import Message from '../../messages/entities/message.entity';



@Entity()
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  nikname: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ nullable: true })
  avatar: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  code: number;

  @ManyToMany(() => Conversation, (conversation: Conversation) => conversation.users)
  public conversation: Conversation[];

  @OneToMany(type => Message, message => message.user)
  messages: Message[];
}

export default User;
