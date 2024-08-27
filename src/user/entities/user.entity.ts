import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Playlist } from 'src/playlist/entities/playlist.entity';
import { Role } from './role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  @Column({ nullable: true })
  username?: string;

  @ManyToMany(() => Playlist, (playlist) => playlist.users)
  playlists: Playlist[];
}
