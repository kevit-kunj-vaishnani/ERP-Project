require('dotenv').config();
import mongoose from 'mongoose';
import express, {Application, Router} from 'express';
import cors from 'cors';
import {server} from './config';
import {mongoConn} from './config';
import {logger} from './utils/logger';
import {errorHandler} from './middleware/error-handler';

const mongoUrl: string = mongoConn.url;
const databaseName: string = mongoConn.db_name;
export class App {
  public app: Application;
  public routers: Router[];

  constructor(routers: Router[]) {
    this.app = express();
    this.routers = routers;
    this.initializeMiddleware();
    this.initializeRoutes();
    this.mongooseSetup();
    this.initializeErrorHandle();
  }

  // initializeErrorHandle method declared here which is called from constructor
  public initializeMiddleware() {
    this.app.use(express.json());
    this.app.use(
      cors({
        origin: true,
        methods: ['OPTIONS', 'GET', 'POST', 'DELETE', 'PATCH'],
        allowedHeaders: [
          'Origin',
          'Host',
          'Content-Language',
          'Content-Type',
          'Content-Length',
          'Accept',
          'User-Agent',
          'Accept-Encoding',
          'Authorization'
        ],
        Credential: true
      })
    );
  }

  // initializeRoutes method declared here which is called from constructor
  public initializeRoutes() {
    this.routers.forEach((router) => {
      this.app.use('/', router);
    });
  }

  // initializeErrorHandle method declared here which is called from constructor
  public initializeErrorHandle() {
    this.app.use(errorHandler);
  }

  // listen method declared here which is called from constructor for listening port
  public listen() {
    this.app.listen(server.port, () => {
      logger.info(`app is running on port ${server.port}`);
    });
  }

  // mongoSetup method declared here which is called from constructor for connecting with database
  public mongooseSetup() {
    mongoose.connection.on('connected', () => {
      logger.info('Database Connected Successfully');
    });

    mongoose.connection.on('error', (err) => {
      logger.info(`Database error : ${err}`);
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn(`Database disconnected...!`);
    });

    mongoose.connect(`${mongoUrl}${databaseName}`);
  }
}


// add comment for testing