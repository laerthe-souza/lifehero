import { getRepository } from 'typeorm';
import aws from 'aws-sdk';

import Incident from '../../models/Incident';
import Ong from '../../models/Ong';

class DeleteIncidentService {
  public async execute(ongId: string): Promise<void> {
    const s3 = new aws.S3();

    const ongsRepository = getRepository(Ong);
    const incidentsRepository = getRepository(Incident);

    const ong = await ongsRepository.findOneOrFail({ where: { id: ongId } });

    const incidents = await incidentsRepository.find({
      where: { ong_id: ongId },
      relations: ['images'],
    });

    const images = incidents.map(incident => incident.images);

    for (const imagesOne of images) {
      for (const imagesTwo of imagesOne) {
        await s3
          .deleteObject({
            Bucket: 'lifehero-pictures',
            Key: imagesTwo.key,
          })
          .promise();
      }
    }

    if (ong.key) {
      await s3
        .deleteObject({
          Bucket: 'lifehero-pictures',
          Key: ong.key,
        })
        .promise();
    }

    await ongsRepository.delete({ id: ongId });
  }
}

export default DeleteIncidentService;
