import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import { promisify } from 'util';
import aws from 'aws-sdk';

import Ong from '../../models/Ong';

interface UpdateImageData {
  ongId: string;
  profile: string;
  key: string;
}

class UpdateImageProfileService {
  public async execute({
    ongId,
    profile,
    key,
  }: UpdateImageData): Promise<string> {
    const s3 = new aws.S3();

    const ongsRepository = getRepository(Ong);

    const ongProfile = await ongsRepository.findOne({
      where: { id: ongId },
    });

    await ongsRepository.update(
      { id: ongId },
      {
        profile,
        key,
      },
    );

    if (ongProfile?.profile) {
      if (process.env.STORAGE_TYPE === 's3') {
        s3.deleteObject({
          Bucket: 'lifehero-pictures',
          Key: ongProfile.key,
        }).promise();
      } else {
        promisify(fs.unlink)(
          path.resolve(__dirname, '..', '..', '..', 'uploads', ongProfile.key),
        );
      }
    }

    const ong = await ongsRepository.findOneOrFail({ id: ongId });

    return ong.profile;
  }
}

export default UpdateImageProfileService;
