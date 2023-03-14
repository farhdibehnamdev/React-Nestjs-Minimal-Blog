import User from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  messageTitle: string;

  @Column()
  messageBody: string;

  @Column({ default: false })
  readStatus: boolean;

  @Column({ default: () => 'Current_TimeStamp' })
  timeStamp: Date;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  sender: User;

  @ManyToMany(() => User, { onDelete: 'CASCADE' })
  @JoinTable()
  receivers: User[];
}
