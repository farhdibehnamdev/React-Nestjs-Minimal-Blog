import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
