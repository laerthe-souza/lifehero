import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';

import transport, { MailProps } from '../../config/nodemailer';
import AppError from '../../errors/AppError';

import Ong from '../../models/Ong';
import Contact from '../../models/Contact';

interface SignUpData {
  name: string;
  email: string;
  password: string;
  cnpj: string;
  city: string;
  uf: string;
  contact: {
    whatsapp: string;
    phone: string;
  };
}

class CreateOngService {
  public async execute({
    name,
    email,
    password,
    cnpj,
    city,
    uf,
    contact: { whatsapp, phone },
  }: SignUpData): Promise<void> {
    const ongsRepository = getRepository(Ong);
    const contactsRepository = getRepository(Contact);

    const findOngWithSameName = await ongsRepository.findOne({
      where: { name },
    });

    const findMatchingEmails = await ongsRepository.findOne({
      where: { email },
    });

    const findOngWithSameCNPJ = await ongsRepository.findOne({
      where: { cnpj },
    });

    const findWhatsAppWithSameNumber = await contactsRepository.findOne({
      where: { whatsapp },
    });

    if (findOngWithSameName) {
      throw new AppError('Este nome já existe. Por favor, tente outro.', 401);
    }

    if (findMatchingEmails) {
      throw new AppError('Este e-mail já existe. Por favor, tente outro.', 401);
    }

    if (findWhatsAppWithSameNumber) {
      throw new AppError(
        'Este número de WhatsApp já existe. Por favor, tente outro.',
        401,
      );
    }

    if (phone) {
      const findPhoneWithSameNumber = await contactsRepository.findOne({
        where: { phone },
      });

      if (findPhoneWithSameNumber) {
        throw new AppError(
          'Este número de telefone já existe. Por favor, tente outro.',
          401,
        );
      }
    }

    if (findOngWithSameCNPJ) {
      throw new AppError('Este CNPJ já está em uso', 401);
    }

    const passwordHash = await bcrypt.hash(password, 8);

    const ong = ongsRepository.create({
      name,
      email,
      password: passwordHash,
      cnpj,
      city,
      uf,
      contact: {
        whatsapp,
        phone,
      },
    });

    await ongsRepository.save(ong);

    const { id, name: ongName } = ong;

    const url = `${process.env.FRONTEND_ONG_PERMISSIONS_URL}/${id}`;

    transport.sendMail(
      {
        from: process.env.NODEMAILER_USER,
        to: process.env.NODEMAILER_USER,
        subject: 'Pedido de ativação do LifeHero',
        template: 'newOng',
        context: { url, ongName },
      } as MailProps,
      (error, response) => {
        if (error) {
          throw new AppError('Não foi possível fazer seu cadastro');
        } else {
          return console.log(response);
        }
      },
    );
  }
}

export default CreateOngService;
