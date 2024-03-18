import { Entity, Column, Index, PrimaryGeneratedColumn } from 'typeorm';
import { GameInterface } from '../../models';

@Entity('games')
export class Game implements GameInterface {
  constructor(obj?: Game) {
    if (obj) {
      Object.assign(this, obj);
      this.normalize();
    }
  }

  @PrimaryGeneratedColumn()
  @Index('game_id_index')
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  imageUrl: string;

  @Column()
  author: string;

  normalize() {
    if (!this.name) this.name = null;
    if (!this.description) this.description = null;
    if (!this.imageUrl) this.imageUrl = null;
    if (!this.author) this.author = null;
  }
}