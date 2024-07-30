import { Music } from 'src/music/entities/music.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany } from 'typeorm';

@Entity()
export class Listener {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToMany(() => Music, (musics) => musics.listeners)
    musics:Music[] 
}