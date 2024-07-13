import { Artist } from 'src/artist/entities/artist.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Music {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 70, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false })
  url: string;

  @ManyToOne(() => Artist, (artist) => artist.musics)
  artist:Artist
}
