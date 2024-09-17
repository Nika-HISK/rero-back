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
  playlistName: string;

  @ManyToMany(() => Music, (music) => music.playlists, { cascade: true })
  @JoinTable()
  musics: Music[];

  @ManyToMany(() => User, (user) => user.playlists)
  @JoinTable()
  users: User[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({nullable:false})
  updatedAt: Date;

  @DeleteDateColumn({nullable:false})
  deletedAt: Date;
}
