import { Category } from 'src/category/entities/category.entity';
import { Tag } from 'src/tag/entities/tag.entity';
import User from 'src/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinTable,
  ManyToMany,
  CreateDateColumn,
  BeforeInsert,
  BeforeUpdate,
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

  @Column({
    type: 'date',
  })
  publishedAt: Date;

  @BeforeInsert()
  validateDates() {
    if (!this.publishedAt) {
      this.publishedAt = new Date();
    }
  }

  @Column({ nullable: true })
  updatedAt: Date;

  @Column({ default: 0 })
  likes: number;

  @Column({ default: 0 })
  views: number;

  @Column()
  image: string;

  @ManyToOne(() => User, (user) => user.articles)
  user: User;

  @ManyToOne(() => Category, (Category) => Category.articles)
  category: Category;

  @JoinTable()
  @ManyToMany(() => Tag, (tag) => tag.articles, { cascade: true })
  tags: Tag[];
}
