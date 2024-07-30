import { Music } from 'src/music/entities/music.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany, ManyToOne, JoinTable } from 'typeorm';

@Entity()
export class Listener {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;


    @ManyToOne(() => User, (user) => user.listeners)
    user:User

    @ManyToMany(() => Music, (music) => music.listeners)
    @JoinTable()
    music:Music

}