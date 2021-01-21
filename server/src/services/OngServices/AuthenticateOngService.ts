import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';

import AppError from '../../errors/AppError';
import generateAuthenticateToken from '../../utils/generateAuthenticateToken';
import Ong from '../../models/Ong';

interface SignInData {
  email: string;
  password: string;
}

interface Data {
  name: string;
  email: string;
  password: string;
  city: string;
  uf: string;
  contact: {
    whatsapp: string;
    phone: string;
  };
}

interface Response {
  ong: Data | undefined;
  token: string;
}

class AuthenticateOngService {
  public async execute({ email, password }: SignInData): Promise<Response> {
    const ongsRepository = getRepository(Ong);

    const findUser = await ongsRepository.findOne({
      where: { email },
    });

    if (!findUser) {
      throw new AppError(
        'Esse usuário não existe. Por favor, verifique suas credenciais.',
        401,
      );
    }

    const findPassword = await bcrypt.compare(password, findUser.password);

    if (!findPassword) {
      throw new AppError(
        'A senha está incorreta. Por favor, tente novamente.',
        401,
      );
    }

    if (findUser.active === false) {
      throw new AppError(
        'Seu cadastro está inativo, por favor aguarde o prazo máximo de até 24 horas e tente novamente.',
        401,
      );
    }

    const token = generateAuthenticateToken(findUser.id);

    const ong = await ongsRepository.findOne(
      { email },
      { relations: ['contact'] },
    );

    return { ong, token };
  }
}

export default AuthenticateOngService;
