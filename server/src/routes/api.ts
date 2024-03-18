import * as express from 'express';
import serverConfig from '../../serverConfig';
import gameRouter from './game';
import scoreRouter from './score';


const api = express.Router()
  .use(serverConfig.routes.games, gameRouter)
  .use(serverConfig.routes.scores, scoreRouter)

export default api;
