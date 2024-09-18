import { Music } from 'src/music/entities/music.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  Column,
} from 'typeorm';

@Entity()
export class Listener {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId:number

  @Column()
  musicId:number

  @CreateDateColumn()
  createdAt: Date;
  
  @ManyToOne(() => Music, (music) => music.listeners)
  music: Music;
}
