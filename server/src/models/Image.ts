import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Incident from './Incident';
import Ong from './Ong';

@Entity('tbl_image')
class Image {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  key: string;

  @Column()
  url: string;

  @Column('uuid')
  incident_id: string;

  @ManyToOne(() => Incident, incident => incident.images)
  @JoinColumn({ name: 'incident_id' })
  ong: Ong;
}

export default Image;
