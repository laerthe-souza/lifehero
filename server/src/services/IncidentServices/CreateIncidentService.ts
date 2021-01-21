import { getRepository } from 'typeorm';

import AppError from '../../errors/AppError';
import Incident from '../../models/Incident';

interface Image {
  key: string;
  url: string;
}

interface IncidentDataRegister {
  title: string;
  description: string;
  value: number;
  ongId: string;
  images: Image[];
}

class CreateIncidentService {
  public async execute({
    title,
    description,
    value,
    ongId,
    images,
  }: IncidentDataRegister): Promise<void> {
    const incidentsRepository = getRepository(Incident);

    const findIncidentWithSameTitle = await incidentsRepository.findOne({
      where: { ong_id: ongId, title },
    });

    if (findIncidentWithSameTitle) {
      throw new AppError(
        'A sua ONG já tem um caso registrado com esse título. Por favor, tente outro',
        401,
      );
    }

    const incident = incidentsRepository.create({
      title,
      description,
      value,
      ong_id: ongId,
      images,
    });

    await incidentsRepository.save(incident);
  }
}

export default CreateIncidentService;
