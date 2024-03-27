import * as express from 'express';
import serverConfig from '../../serverConfig';
import gameRouter from './game';
import scoreRouter from './score';
import authenticateRouter from './authenticate';


const api = express.Router()
  .use(serverConfig.routes.games, gameRouter)
  .use(serverConfig.routes.scores, scoreRouter)
  .use(serverConfig.routes.authenticate, authenticateRouter)

export default api;
