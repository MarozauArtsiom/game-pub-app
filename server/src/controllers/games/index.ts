import { Request, Response } from 'express';
import { Game } from '../../entities/game';

interface GameServiceInterface {
  readAll(): Promise<Game[]>
  readOne(id: string): Promise<Game>
  create(payload: Game): Promise<Game>
  update(id: string, payload: Game): Promise<any>
  delete(id: string): Promise<any>
}

export class GameController {
  private service: GameServiceInterface;

  constructor({ service }) {
    this.service = service;
  }

  public getAll() {
    return async (req: Request, res: Response): Promise<void> => {
      try {
        const games = await this.service.readAll();
        if (games) {
          games.map(game => game.normalize());
        }

        res.send(games || []);
      } catch (err) {
        console.log(err);
        res.status(500).send('Something went wrong!');
      }
    };
  }

  public getByID() {
    return async (req: Request, res: Response): Promise<void> => {
      try {
        const game = await this.service.readOne(req.params.id);
        if (game) {
          game.normalize();
        }

        res.send(game || null);
      } catch (err) {
        console.log(err);
        res.status(500).send('Something went wrong!');
      }
    };
  }

  public create() {
    return async (req: Request, res: Response): Promise<void> => {
      try {
        const game = new Game(req.body);
        const created = await this.service.create(game);
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
        const game = await this.service.readOne(req.params.id);
        if (game) {
          game.normalize();
        }

        res.send(game || null);
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
