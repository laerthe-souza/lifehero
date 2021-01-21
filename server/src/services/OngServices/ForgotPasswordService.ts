import { getRepository } from 'typeorm';

import transport, { MailProps } from '../../config/nodemailer';
import AppError from '../../errors/AppError';
import Ong from '../../models/Ong';
import generateForgotPasswordToken from '../../utils/generateForgotPasswordToken';

class ForgotPasswordService {
  public async execute(ongEmail: string): Promise<void> {
    const ongsRepository = getRepository(Ong);

    const { id, name, email } = await ongsRepository.findOneOrFail({
      where: { email: ongEmail },
    });

    const token = generateForgotPasswordToken(id);

    const url = `${process.env.FRONTEND_RECOVERY_PASSWORD_URL}/${token}`;

    transport.sendMail(
      {
        from: process.env.NODEMAILER_USER,
        to: email,
        subject: 'Link para recuperção de senha da sua conta no LifeHero',
        template: 'sendEmailForRecoveryPassword',
        context: { url, name },
      } as MailProps,
      (error, response) => {
        if (error) {
          throw new AppError(
            'Não foi possível enviar um e-mail para o e-mail fornecido',
          );
        } else {
          return console.log(response);
        }
      },
    );
  }
}

export default ForgotPasswordService;
