import { Album } from 'src/album/entities/album.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Music {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 70, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false })
  url: string;




  @ManyToOne(() => Album, (album) => album.musics)
  album:Album
}
