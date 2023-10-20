require('dotenv').config();
import express, {Application, Router} from 'express';
import {server} from './config';
import {logger} from './utils/logger';
import mongoose from 'mongoose';

const mongoUrl: string = server.url;

export class App {
  private app: Application;
  private routers: Router[];

  constructor(routers: Router[]) {
    this.routers = routers;
    this.app = express();
    this.initializeRoutes();
    this.mongoSetup();
  }

  // initializeRoutes method declared here which is called from constructor
  initializeRoutes() {
    this.routers.forEach((router) => {
      this.app.use('/', router);
    });
  }

  // listen method declared here which is called from constructor for listening port
  listen() {
    this.app.listen(server.port, () => {
      logger.info(`app is running on port ${server.port}`);
    });
  }

  // mongoSetup method declared here which is called from constructor for connecting with database
  public mongoSetup() {
    mongoose.connection.on('connected', () => {
      logger.info('Database Connected Successfully');
    });

    mongoose.connection.on('error', (err) => {
      logger.info(`Database error : ${err}`);
    });

    const dbOptions = {
      maxPoolSize: 5,
      useNewUrlParser: true
    };

    mongoose.connect(mongoUrl, dbOptions);
  }
}
