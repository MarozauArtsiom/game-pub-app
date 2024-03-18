import * as express from 'express';
import serverConfig from '../../../serverConfig';
import { Game } from '../../entities/game';
import { GameService } from '../../services/games';
import { GameController } from '../../controllers/games';

const repository = serverConfig.dbSource.getRepository(Game);
const service = new GameService(repository);
const controller = new GameController({ service });

export default express.Router()
  .get('', controller.getAll())
  .get('/:id', controller.getByID())
  .post('', controller.create())
  .put('/:id', controller.update())
  .delete('/:id', controller.delete());
