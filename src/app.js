import dotenv from 'dotenv';
import express from 'express';
import { resolve } from 'path';
import cors from 'cors';
import helmet from 'helmet';
import tokenRoutes from './routes/TokenRoutes';
import userRoutes from './routes/userRoutes';
import studentRoutes from './routes/studentRoutes';
import photoRoutes from './routes/photoRoutes';
import './database/index';

const whitelist = ['http://localhost:3000'];

const corsOptions = {
  origin(origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) callback(null, true);
    else callback(new Error('Not Allowed by Cors'));
  },
};
dotenv.config();
class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(express.static(resolve(__dirname, 'uploads')));
    this.app.use(cors(corsOptions));
    this.app.use(helmet());
  }

  routes() {
    this.app.use('/tokens/', tokenRoutes);
    this.app.use('/users/', userRoutes);
    this.app.use('/students/', studentRoutes);
    this.app.use('/photos/', photoRoutes);
  }
}

export default new App().app;
