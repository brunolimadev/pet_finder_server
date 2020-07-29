import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import Pet from './Pet';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  postal_code: string;

  @Column()
  address: string;

  @Column()
  number: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  password: string;

  @OneToMany(type => Pet, pet => pet.user)
  pets: Pet[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
export default User;
