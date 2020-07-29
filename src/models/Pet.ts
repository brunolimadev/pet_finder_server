import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from './User';

@Entity('pets')
class Pet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  breed: string;

  @Column()
  age: number;

  @Column()
  weight: number;

  @Column()
  image: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User, user => user.pets)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
export default Pet;
