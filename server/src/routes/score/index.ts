import * as express from 'express';
import serverConfig from '../../../serverConfig';
import { Score } from '../../entities/score';
import { ScoreService } from '../../services/scores';
import { ScoreController } from '../../controllers/scores';

const repository = serverConfig.dbSource.getRepository(Score);
const service = new ScoreService(repository);
const controller = new ScoreController({ service });

export default express.Router()
  .get('', controller.getAll())
  .get('/:id', controller.getByID())
  .post('', controller.create())
  .put('/:id', controller.update())
  .delete('/:id', controller.delete());
