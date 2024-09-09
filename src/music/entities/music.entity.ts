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
} from 'typeorm';
import { Listener } from 'src/listeners/entities/listener.entity';

@Entity()
export class Music {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 70, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false })
  musicImage: string;

  @Column({ type: 'text', nullable: false })
  musicAudio: string;

  @Column()
  albumId: number;

  @ManyToOne(() => Album, (album) => album.musics, { onDelete: 'CASCADE' })
  album: Album;

  @ManyToOne(() => Artist, (artist) => artist.musics)
  artist: Artist;

  @OneToMany(() => Listener, (listener) => listener.music)
  listeners: Listener[];

  @ManyToMany(() => Playlist, (playlist) => playlist.musics)
  playlists: Playlist[];
}
