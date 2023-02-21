import Article from 'src/article/entities/article.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'boolean', default: false, nullable: false })
  isPublished: boolean;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => Article, (article) => article.category, { cascade: true })
  articles: Article[];
}
