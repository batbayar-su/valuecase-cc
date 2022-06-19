import { Image } from 'src/images/entities/image.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @OneToOne((type) => Image, { nullable: true })
  @JoinColumn()
  imageId: number;
}
