import 'dotenv/config';
import * as express from 'express';
import { DataSource } from 'typeorm';
import serverConfig from '../serverConfig';


export class App {
  private static app = express();
  private static port = serverConfig.port;
  private static postgreConnection: DataSource;

  private static initServer() {
    const { default: router } = require('./routes');
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false}));
    this.app.use('/', router);
  }

  private static async connectPostgre() {
    this.postgreConnection = await serverConfig.dbSource.initialize();
}

  public static async start() {
    try {
      await Promise.all([this.connectPostgre()]);
      this.initServer();
      this.app.listen(this.port, () => console.log(`Server is up and running on port ${this.port}`));
    } catch (err) {
      console.error(err);
      if (this.postgreConnection && this.postgreConnection.isInitialized) {
        this.postgreConnection.destroy();
      }
    }
  }
}
