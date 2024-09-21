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
  Repository,
} from 'typeorm';
import { Listener } from 'src/listeners/entities/listener.entity';
import { Topchart } from 'src/topcharts/entities/topchart.entity';

@Entity()
export class Chart {

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
  
    @ManyToOne(() => Album, (album) => album.charts)
    album: Album;
  
    @ManyToOne(() => Artist, (artist) => artist.charts)
    @JoinColumn({ name: 'artistId' })
    artist: Artist;
  
    @OneToMany(() => Topchart, (topchart) => topchart.chart)
    topchart: Topchart[];
  
    @OneToMany(() => Topchart, (topchart) => topchart.chart)
    topcharts: Topchart[];

    
}
