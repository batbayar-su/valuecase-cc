import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Block {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  subtitle: string;

  @Column()
  index: number;

  @Column({ length: 500, nullable: true })
  body: string;

  @Column({ nullable: true })
  imageId: number;
}
