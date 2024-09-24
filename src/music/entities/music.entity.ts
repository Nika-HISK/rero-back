import { Playlist } from 'src/playlist/entities/playlist.entity';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Listener } from 'src/listeners/entities/listener.entity';

@Entity()
export class Music {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 70, nullable: false })
  name: string;

  @Column({ nullable: false })
  musicAudio: string;

  @Column({ nullable: false })
  coverImage: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  duration?: string;

  @Column({ nullable: true })
  albumId: number;

  @Column({ type: 'int' })
  artistId: number;

  @ManyToOne(() => Album, (album) => album.musics, { cascade: true })
  album: Album;

  @ManyToOne(() => Artist, (artist) => artist.musics, { cascade: true })
  @JoinColumn({ name: 'artistId' })
  artist: Artist;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @OneToMany(() => Listener, (listener) => listener.music, { cascade: true })
  listeners: Listener[];

  @ManyToMany(() => Playlist, (playlist) => playlist.musics, { cascade: true , onDelete: 'CASCADE',})
  playlists: Playlist[];
}
