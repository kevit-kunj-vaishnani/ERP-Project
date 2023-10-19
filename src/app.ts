require('dotenv').config();
import express, {Application, Router} from 'express';
import {server} from './config';
import {logger} from './utils/logger';

export class App {
  private app: Application;
  private routers: Router[];

  constructor(routers: Router[]) {
    this.routers = routers;
    this.app = express();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.routers.forEach((router) => {
      this.app.use('/', router);
    });
  }

  listen() {
    this.app.listen(server.port, () => {
      logger.info(`app is running on port ${server.port}`);
    });
  }
}
