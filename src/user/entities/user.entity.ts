import { IsEnum } from 'class-validator';
import { Listener } from 'src/listeners/entities/listener.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable:false})
  name: string;

  @Column({nullable:false})
  email: string;

  @Column({nullable:false})
  password: string;

  @IsEnum(['admin', 'user'])
  role:string

  @OneToMany(() => Listener, (listener) => listener.user)
  listeners:Listener[]

  
}
