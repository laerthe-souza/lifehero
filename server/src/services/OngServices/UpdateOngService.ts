import { getRepository } from 'typeorm';

import Ong from '../../models/Ong';
import Contact from '../../models/Contact';
import generateAuthenticateToken from '../../utils/generateAuthenticateToken';

interface OngData {
  name: string;
  email: string;
  whatsapp: string;
  phone: string;
  city: string;
  uf: string;
  ongId: string;
}

interface Response {
  ong: Ong;
  token: string;
}

class UpdateOngService {
  public async execute({
    name,
    email,
    whatsapp,
    phone,
    city,
    uf,
    ongId,
  }: OngData): Promise<Response> {
    const ongsRepository = getRepository(Ong);
    const contactsRepository = getRepository(Contact);

    await ongsRepository.update({ id: ongId }, { name, email, city, uf });

    await contactsRepository.update({ ong_id: ongId }, { whatsapp, phone });

    const token = generateAuthenticateToken(ongId);

    const ong = await ongsRepository.findOneOrFail(ongId, {
      relations: ['contact'],
    });

    return { ong, token };
  }
}

export default UpdateOngService;
