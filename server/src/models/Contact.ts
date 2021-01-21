import {
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
  Column,
} from 'typeorm';

import Ong from './Ong';

@Entity('tbl_contact')
class Contact {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  whatsapp: string;

  @Column()
  phone: string;

  @Column('uuid')
  ong_id: string;

  @OneToOne(() => Ong, ong => ong.contact)
  @JoinColumn({ name: 'ong_id' })
  ong: Ong;
}

export default Contact;
