import { Playlist } from 'src/playlist/entities/playlist.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @ManyToMany(() => Playlist, (playlist) => playlist.users)
  playlists: Playlist[];
}
