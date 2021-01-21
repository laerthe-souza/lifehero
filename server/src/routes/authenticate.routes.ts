import { Router } from 'express';

import Ong from '../models/Ong';

import ensurePasswordRecovery from '../middlewares/ensurePasswordRecovery';
import AuthenticateOngService from '../services/OngServices/AuthenticateOngService';
import ForgotPasswordService from '../services/OngServices/ForgotPasswordService';
import RecoveryPasswordService from '../services/OngServices/RecoveryPasswordService';

import ongsView from '../views/ongsView';

const authenticateRoutes = Router();

authenticateRoutes.post('', async (request, response) => {
  const { email, password } = request.body;

  const authenticateOng = new AuthenticateOngService();

  const { ong, token } = await authenticateOng.execute({ email, password });

  return response.status(200).json({ ong: ongsView.render(ong as Ong), token });
});

authenticateRoutes.post('/forgotPassword', async (request, response) => {
  const { email } = request.body;

  const forgotPassword = new ForgotPasswordService();

  await forgotPassword.execute(email);

  return response.status(200).send();
});

authenticateRoutes.post(
  '/recoveryPassword',
  ensurePasswordRecovery,
  async (request, response) => {
    const { ongId } = request.ong;
    const { password: newPassword } = request.body;

    const recoveryPassword = new RecoveryPasswordService();

    await recoveryPassword.execute({ ongId, newPassword });

    return response.status(200).send();
  },
);

export default authenticateRoutes;
