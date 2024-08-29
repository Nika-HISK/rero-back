import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Playlist } from 'src/playlist/entities/playlist.entity';
import { Role } from '../../auth/guard/enum/role.enum';
import { Listener } from 'src/listeners/entities/listener.entity';
import { IsEnum } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({nullable:false})
  password: string;

  @IsEnum(['admin', 'user'])
  role:string

  @OneToMany(() => Listener, (listener) => listener.user)
  listeners:Listener[]

  @ManyToMany(() => Playlist, (playlist) => playlist.users)
  playlists:Playlist[]

  
}
