import { Playlist } from 'src/playlist/entities/playlist.entity';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class Music {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 70, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false })
  url: string;

  @ManyToOne(() => Album, (album) => album.musics)
  album: Album;

  @ManyToOne(() => Artist, (artist) => artist.musics)
  artist: Artist;

  @ManyToMany(() => Playlist, (playlist) => playlist.musics)
  @JoinTable()
  playlists: Playlist[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
