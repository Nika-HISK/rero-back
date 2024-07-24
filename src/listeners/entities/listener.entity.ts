import { Music } from "src/music/entities/music.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Listener {
    @PrimaryGeneratedColumn()
    id:number

    @ManyToMany(() => Music, (music) => music.listeners)
    music:Music[]

    @Column()
    listened:number

    @Column()
    today:number
}
