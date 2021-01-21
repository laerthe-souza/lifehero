import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  BeforeInsert,
} from 'typeorm';

import Contact from './Contact';
import Incident from './Incident';

@Entity('tbl_ong')
class Ong {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  cnpj: string;

  @Column()
  city: string;

  @Column()
  uf: string;

  @Column()
  profile: string;

  @Column()
  key: string;

  @Column('boolean')
  active: boolean;

  @OneToOne(() => Contact, contact => contact.ong, {
    cascade: ['insert', 'update', 'remove'],
  })
  contact: Contact;

  @OneToMany(() => Incident, incident => incident.ong, {
    cascade: ['update', 'remove'],
  })
  incidents: Incident[];

  @BeforeInsert()
  beforeInsertActions(): void {
    this.active = false;
  }
}

export default Ong;
