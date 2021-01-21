import { getRepository } from 'typeorm';
import aws from 'aws-sdk';

import Image from '../../models/Image';
import Incident from '../../models/Incident';

interface UpdateIncidentData {
  incidentId: string;
  title: string;
  description: string;
  value: number;
  previews: Array<string>;
  images: Array<{
    key: string;
    url: string;
  }>;
}

class UpdateIncidentService {
  public async execute({
    incidentId,
    title,
    description,
    value,
    previews,
    images,
  }: UpdateIncidentData): Promise<void> {
    const incidentsRepository = getRepository(Incident);
    const imagesRespository = getRepository(Image);
    const s3 = new aws.S3();

    const incidentsImages = await imagesRespository.find({
      where: { incident_id: incidentId },
    });

    const deleteImages = incidentsImages.filter(
      image => !previews.includes(image.url),
    );

    await incidentsRepository.update(
      { id: incidentId },
      { title, description, value },
    );

    if (deleteImages.length !== 0) {
      for (const image of deleteImages) {
        await imagesRespository.delete({ id: image.id });

        await s3
          .deleteObject({
            Bucket: 'lifehero-pictures',
            Key: image.key,
          })
          .promise();
      }
    }

    if (images.length !== 0) {
      let createImages;

      for (const image of images) {
        createImages = imagesRespository.create({
          key: image.key,
          url: image.url,
          incident_id: incidentId,
        });

        await imagesRespository.save(createImages);
      }
    }
  }
}

export default UpdateIncidentService;
