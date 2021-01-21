import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import jwtConfig from '../config/jwt';
import AppError from '../errors/AppError';

interface TokenPayLoad {
  sub: string;
  iat: number;
  exp: number;
}

export default function (
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Nenhum token foi informado na requisição.', 401);
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2) {
    throw new AppError('Token com formato inválido.', 401);
  }

  const [schema, token] = parts;

  if (!/^Bearer$/i.test(schema)) {
    throw new AppError('Token inválido');
  }

  try {
    const decoded = jwt.verify(token, jwtConfig.jwtForgotPassword.secret);

    const { sub } = decoded as TokenPayLoad;

    request.ong = {
      ongId: sub,
    };

    return next();
  } catch (err) {
    console.log(err.message);
    throw new AppError('Token expirado ou inválido');
  }
}
