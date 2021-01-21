import multer, { Options } from 'multer';
import path from 'path';
import crypto from 'crypto';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';

const storageTypes = {
  local: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'uploads'),
    filename: (request, file, callback) => {
      const fileName = `${crypto
        .randomBytes(16)
        .toString('hex')}-${file.originalname.replace(/\s/g, '')}`;

      callback(null, fileName);
    },
  }),
  s3: multerS3({
    s3: new aws.S3(),
    bucket: 'lifehero-pictures',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (request, file, callback) => {
      const fileName = `${crypto
        .randomBytes(16)
        .toString('hex')}-${file.originalname.replace(/\s/g, '')}`;

      callback(null, fileName);
    },
  }),
};

const multerConfig = multer({
  storage: storageTypes.s3,
  fileFilter: (request, file, callback) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/jpg'];

    if (allowedMimes.includes(file.mimetype)) {
      callback(null, true);
    } else callback(new Error('Formato de arquivo inválido'));
  },
});

export default multerConfig as Options;
