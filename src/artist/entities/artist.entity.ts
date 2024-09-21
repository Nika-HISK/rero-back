import { Album } from "src/album/entities/album.entity";
import { Chart } from "src/chart/entities/chart.entity";
import { Music } from "src/music/entities/music.entity";
import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Artist {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 30, nullable: false })
    artistName: string

    @Column({ nullable: false })
    artistPhoto: string

    @Column({ type: 'text', nullable: false })
    biography: string

    @OneToMany(() => Music, (music) => music.artist)
    musics: Music[]

    @OneToMany(() => Album, (album) => album.artist)
    albums: Album[]


    @OneToMany(() => Chart, (chart) => chart.artist)
    charts: Chart[]

    @DeleteDateColumn()
    deletedAt:Date
}