import { Chart } from 'src/chart/entities/chart.entity';
import { Music } from 'src/music/entities/music.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  Column,
  JoinTable,
} from 'typeorm';

@Entity()
export class Topchart {

  @PrimaryGeneratedColumn()
  id: number;


  @Column()
  musicId:number

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Chart, (chart) => chart.topcharts)  
  chart: Chart;
}
