import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Listener } from 'src/listeners/entities/listener.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Music {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 70, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false })
  url: string;

  @ManyToOne(() => Album, (album) => album.musics)
  album: Album
  artist: any;


  @ManyToOne(() => Artist, (artist) => artist.musics)
  artists: Artist

  @ManyToMany(() => Listener, (listener) => listener.music)
  @JoinTable()
  listeners:Listener[]

}
