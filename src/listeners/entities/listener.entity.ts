import { Music } from 'src/music/entities/music.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany } from 'typeorm';

@Entity()
export class Listener {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @Column()
    userId:number

    @Column()
    musicId:number

}