import { Artist } from "src/artist/entities/artist.entity";
import { Music } from "src/music/entities/music.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()

export class Album {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', nullable: false })
    title: string


    @Column({ nullable: false })
    releaseDate: string


    @OneToMany(() => Music, (musics) => musics.album)
    musics: Music[]

    @ManyToOne(() => Artist, (artist) => artist.albums)
    artist:Artist

}