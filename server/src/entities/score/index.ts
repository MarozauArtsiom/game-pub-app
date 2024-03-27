import { Entity, Column, Index, PrimaryGeneratedColumn } from 'typeorm';
import { ScoreInterface } from '../../models';

@Entity('scores')
export class Score implements ScoreInterface {
  constructor(obj?: Score) {
    if (obj) {
      Object.assign(this, obj);
      this.normalize();
    }
  }

  @PrimaryGeneratedColumn()
  @Index('score_id_index')
  id: number;

  @Column()
  topScore: number;

  @Column()
  playerName: string;

  @Column()
  profileUrl: string;

  @Column()
  date: Date;

  normalize() {
    if (!this.topScore) this.topScore = null;
    if (!this.playerName) this.playerName = null;
    if (!this.profileUrl) this.profileUrl = null;
    if (!this.date) this.date = null;
  }
}