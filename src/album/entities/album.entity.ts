import { Artist } from 'src/artist/entities/artist.entity';
import { Music } from 'src/music/entities/music.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Album {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ nullable: false })
  releaseDate: string;

  @OneToMany(() => Music, (musics) => musics.album)
  musics: Music[];

  @Column()
  artistId: Number;

  @ManyToOne(() => Artist, (artist) => artist.albums)
  artist: Artist;
}
