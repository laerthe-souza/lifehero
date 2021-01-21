import { getRepository } from 'typeorm';

import transport, { MailProps } from '../../config/nodemailer';
import AppError from '../../errors/AppError';
import Ong from '../../models/Ong';

class RejectOngRegistrationService {
  public async execute(id: string): Promise<void> {
    const ongsRepository = getRepository(Ong);

    const { name, email } = await ongsRepository.findOneOrFail({
      where: { id },
    });

    await ongsRepository.delete({ id });

    const url = process.env.FRONTEND_URL;

    transport.sendMail(
      {
        from: process.env.NODEMAILER_USER,
        to: email,
        subject: 'Resposta sobre o ativação do seu cadastro no LifeHero',
        template: 'rejectOngRegistration',
        context: { name, url },
      } as MailProps,
      (error, response) => {
        if (error) {
          throw new AppError('Erro ao enviar e-mail para ong');
        }

        console.log(response);
      },
    );
  }
}

export default RejectOngRegistrationService;
