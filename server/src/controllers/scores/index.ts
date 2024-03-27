import { Request, Response } from 'express';
import { Score } from '../../entities/score';

interface ScoreServiceInterface {
  readAll(): Promise<Score[]>
  readOne(id: string): Promise<Score>
  create(payload: Score): Promise<Score>
  update(id: string, payload: Score): Promise<any>
  delete(id: string): Promise<any>
}

export class ScoreController {
  private service: ScoreServiceInterface;

  constructor({ service }) {
    this.service = service;
  }

  public getAll() {
    return async (req: Request, res: Response): Promise<void> => {
      try {
        const scores = await this.service.readAll();
        if (scores) {
          scores.map(score => score.normalize());
        }

        res.send(scores || []);
      } catch (err) {
        console.log(err);
        res.status(500).send('Something went wrong!');
      }
    };
  }

  public getByID() {
    return async (req: Request, res: Response): Promise<void> => {
      try {
        const score = await this.service.readOne(req.params.id);
        if (score) {
          score.normalize();
        }

        res.send(score || null);
      } catch (err) {
        console.log(err);
        res.status(500).send('Something went wrong!');
      }
    };
  }

  public create() {
    return async (req: Request, res: Response): Promise<void> => {
      try {
        const score = new Score(req.body);
        const created = await this.service.create(score);
        res.send(created);
      } catch (err) {
        console.log(err);
        res.status(500).send('Something went wrong!');
      }
    };
  }

  public update() {
    return async (req: Request, res: Response): Promise<void> => {
      try {
        await this.service.update(req.params.id, req.body);
        const score = await this.service.readOne(req.params.id);
        if (score) {
          score.normalize();
        }

        res.send(score || null);
      } catch (err) {
        console.log(err);
        res.status(500).send('Something went wrong!');
      }
    };
  }

  public delete() {
    return async (req: Request, res: Response): Promise<void> => {
      try {
        await this.service.delete(req.params.id);

        res.send({ deletedID: req.params.id });
      } catch (err) {
        console.log(err);
        res.status(500).send('Something went wrong!');
      }
    };
  }
}
