import User from 'src/user/entities/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import Conversation from '../../conversation/entities/conversation.entity';


@Entity()
class Message {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public content!: string;

  @ManyToOne(type => User, user => user.messages, {cascade: true})
  user!: User;

  @Column()
  public userId!: number;

  @ManyToOne(() => Conversation)
  public conversation!: Conversation;

  @Column()
  public conversationId!:number

  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;
}

export default Message
