import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  BeforeInsert,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import Ong from './Ong';
import Image from './Image';

@Entity('tbl_incident')
class Incident {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column('decimal')
  value: number;

  @Column()
  views: number;

  @Column('uuid')
  ong_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Ong, ong => ong.incidents)
  @JoinColumn({ name: 'ong_id' })
  ong: Ong;

  @OneToMany(() => Image, image => image.ong, {
    cascade: ['insert', 'update', 'recover'],
  })
  images: Image[];

  @BeforeInsert()
  beforeInsertActions(): void {
    this.views = 0;
  }
}

export default Incident;
