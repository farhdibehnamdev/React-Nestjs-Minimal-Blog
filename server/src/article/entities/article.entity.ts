import { Category } from 'src/category/entities/Category.entity';
import { Tag } from 'src/tag/entities/tag.entity';
import User from 'src/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinTable,
  ManyToMany,
} from 'typeorm';

@Entity()
export default class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  slug: string;

  @Column()
  body: string;

  @Column()
  isPublished: boolean;

  @Column()
  publishedAt: Date;

  @Column()
  updatedAt: Date;

  @Column({ default: 0 })
  likes: number;

  @ManyToOne(() => User, (user) => user.articles)
  user: User;

  @ManyToOne(() => Category, (Category) => Category.articles)
  category: Category;

  @JoinTable()
  @ManyToMany(() => Tag, (tag) => tag.articles)
  tags: Tag[];
}
