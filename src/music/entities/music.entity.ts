import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Music {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 70, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false })
  url: string;
}
