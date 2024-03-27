import * as express from 'express';
import { AuthenticateService } from '../../services/authenticate';
import { AuthenticateController } from '../../controllers/authenticate';

const service = new AuthenticateService();
const controller = new AuthenticateController({ service });

export default express.Router()
  .post('/', controller.authenticate());
