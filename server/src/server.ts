import 'reflect-metadata';

import { config } from 'dotenv';

config();

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';

import 'express-async-errors';

import routes from './routes';
import AppError from './errors/AppError';

import './database/connection';
import SocketServer from './socket/SocketServer';

const app = express();
const server = require('http').Server(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.log(err.message);

  return response.status(500).json({
    status: 'error',
    message: 'Erro interno no servidor',
  });
});

server.listen(process.env.PORT || 3333, () => {
  console.log(`Server started on port ${process.env.PORT || 3333}`);
});

app.set('socketServer', new SocketServer(server));
