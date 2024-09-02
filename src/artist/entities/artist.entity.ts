import { Album } from "src/album/entities/album.entity";
import { Music } from "src/music/entities/music.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Artist {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 30, nullable: false })
    firstName: string

    @Column({ type: 'varchar', length: 30, nullable: false })
    lastName: string

    @Column({ type: 'text', nullable: false })
    biography: string

    @OneToMany(() => Music, (music) => music.artist)
    musics: Music[]

    @OneToMany(() => Album, (album) => album.artist) 
    albums:Album[]
}