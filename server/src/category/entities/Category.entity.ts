import Article from 'src/article/entities/article.entity';
import { Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany(() => Article, (article) => article.category)
  articles: Article[];
}
