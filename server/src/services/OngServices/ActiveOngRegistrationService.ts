import { getRepository } from 'typeorm';

import transport, { MailProps } from '../../config/nodemailer';
import AppError from '../../errors/AppError';
import Ong from '../../models/Ong';

class ActiveOngRegistrationService {
  public async execute(id: string): Promise<void> {
    const ongsRepository = getRepository(Ong);

    await ongsRepository.update({ id }, { active: true });

    const { name, email } = await ongsRepository.findOneOrFail(id, {
      relations: ['contact'],
    });

    const url = process.env.FRONTEND_URL;

    transport.sendMail(
      {
        from: process.env.NODEMAILER_USER,
        to: email,
        subject: 'Resposta sobre o ativação do seu cadastro no LifeHero',
        template: 'activeOngRegistration',
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

export default ActiveOngRegistrationService;
