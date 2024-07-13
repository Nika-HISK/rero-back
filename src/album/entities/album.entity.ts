import { Music } from "src/music/entities/music.entity";
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";





@Entity()

export class Album {
    @PrimaryGeneratedColumn()
    id:number

    @Column({type:'varchar', nullable:false})
    title:string


    @Column({nullable:false})
    releaseDate:string


    @OneToMany(() => Music, (musics) => musics.album)
    musics:Music[]

}