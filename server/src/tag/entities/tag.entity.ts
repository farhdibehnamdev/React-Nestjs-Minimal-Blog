import Article from 'src/article/entities/article.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'boolean', default: false, nullable: false })
  isPublished: boolean;

  @Column({ nullable: true })
  description: string;

  @ManyToMany(() => Article, (article) => article.tags)
  articles: Article[];
}
