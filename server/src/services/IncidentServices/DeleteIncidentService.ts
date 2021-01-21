import { getRepository } from 'typeorm';
import aws from 'aws-sdk';

interface Data {
  incidentId: string;
  ongId: string;
}

import Incident from '../../models/Incident';

class DeleteIncidentservice {
  public async execute({ ongId, incidentId }: Data): Promise<void> {
    const incidentsRepository = getRepository(Incident);
    const s3 = new aws.S3();

    const incidentImages = await incidentsRepository.findOneOrFail(incidentId, {
      relations: ['images'],
    });

    await incidentsRepository.delete({ ong_id: ongId, id: incidentId });

    incidentImages.images.forEach(async image => {
      await s3
        .deleteObject({
          Bucket: 'lifehero-pictures',
          Key: image.key,
        })
        .promise();
    });
  }
}

export default DeleteIncidentservice;
