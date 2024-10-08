import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Playlist } from 'src/playlist/entities/playlist.entity';
import { Listener } from 'src/listeners/entities/listener.entity';
import { Role } from 'src/auth/guard/enum/role.enum';


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({default:false})
  banned:boolean 

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  @OneToMany(() => Playlist, (playlist) => playlist.user)
  playlists: Playlist[];
  
  
}