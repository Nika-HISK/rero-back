import { Music } from 'src/music/entities/music.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinTable,
} from 'typeorm';

@Entity()
export class Playlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @ManyToMany(() => Music, (music) => music.playlists, { cascade: true })
  @JoinTable()
  musics: Music[];

  @ManyToMany(() => User, (user) => user.playlists)
  @JoinTable()
  users: User[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
