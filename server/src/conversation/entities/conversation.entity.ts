import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import User from '../../user/entities/user.entity';


@Entity()
class Conversation {
  @PrimaryGeneratedColumn()
  public id!: number;

  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt: Date;

  @ManyToMany(() => User, {cascade: true})
  @JoinTable()
  users!: User[];

}

export default Conversation;
