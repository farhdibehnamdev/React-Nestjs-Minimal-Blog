import Article from 'src/article/entities/article.entity';
import { Message } from 'src/message/entities/message.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity()
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ default: false })
  isActive: boolean;

  @Column({ nullable: true })
  verificationEmailToken: string;

  @Column({ type: 'varchar', default: UserRole.USER, name: 'userRole' })
  userRole: UserRole;

  @OneToMany(() => Article, (article) => article.user)
  articles: Article[];

  @ManyToMany(() => Message, { cascade: true })
  @JoinTable()
  messages: Message[];
}
