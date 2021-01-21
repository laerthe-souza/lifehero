import { getRepository } from 'typeorm';
import aws from 'aws-sdk';

import Ong from '../../models/Ong';

class DeleteImageProfileService {
  public async execute(ongId: string): Promise<void> {
    const s3 = new aws.S3();

    const ongsRepository = getRepository(Ong);

    const { key } = await ongsRepository.findOneOrFail({
      where: { id: ongId },
    });

    await ongsRepository.update({ id: ongId }, { profile: undefined });

    await s3
      .deleteObject({
        Bucket: 'lifehero-pictures',
        Key: key,
      })
      .promise();
  }
}

export default DeleteImageProfileService;
