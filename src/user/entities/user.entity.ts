import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Playlist } from 'src/playlist/entities/playlist.entity';
import { Listener } from 'src/listeners/entities/listener.entity';
import { IsEnum } from 'class-validator';
import { Role } from 'src/auth/guard/enum/role.enum';


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  @OneToMany(() => Listener, (listener) => listener.user)
  listeners: Listener[];

  @ManyToMany(() => Playlist, (playlist) => playlist.users)
  playlists: Playlist[];
}