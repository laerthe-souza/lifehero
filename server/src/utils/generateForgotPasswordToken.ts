import jwt from 'jsonwebtoken';

import jwtConfig from '../config/jwt';

export default function (ongId: string): string {
  const { secret, expiresIn } = jwtConfig.jwtForgotPassword;

  const token = jwt.sign({}, secret, {
    subject: ongId,
    expiresIn,
  });

  return token;
}
