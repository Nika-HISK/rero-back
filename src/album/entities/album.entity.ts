import { Music } from 'src/music/entities/music.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import {
  Column,
  DeleteDateColumn,
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

 
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  releaseDate: string;

  @Column({ nullable: true })
  albumCover: string;

  @OneToMany(() => Music, (music) => music.album)
  musics: Music[];
  
  @Column()
  artistId: number;

  @ManyToOne(() => Artist, (artist) => artist.albums)
  artist: Artist;

  @DeleteDateColumn()
  deletedAt:Date
}
