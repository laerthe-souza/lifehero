import { Router } from 'express';
import { getRepository } from 'typeorm';
import multer from 'multer';

import multerConfig from '../config/multer';
import Ong from '../models/Ong';
import CreateOngService from '../services/OngServices/CreateOngService';
import UpdadateOngService from '../services/OngServices/UpdateOngService';
import ongsView from '../views/ongsView';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UpdateImageProfileService from '../services/OngServices/UpdateImageProfileService';
import ActiveOngRegistrationService from '../services/OngServices/ActiveOngRegistrationService';
import RejectOngRegistrationService from '../services/OngServices/RejectOngRegistrationService';
import DeleteOngService from '../services/OngServices/DeleteOngService';
import DeleteImageProfileService from '../services/OngServices/DeleteImageProfileService';

interface Profile extends Express.Multer.File {
  location: string;
  key: string;
}

const upload = multer(multerConfig).single('profile');
const ongsRoutes = Router();

ongsRoutes.get('/:ongId', async (request, response) => {
  const { ongId } = request.params;

  const ongsRepository = getRepository(Ong);

  const ong = await ongsRepository.findOne(ongId, {
    relations: ['contact'],
    where: { active: false },
  });

  return response.status(200).json(ong);
});

ongsRoutes.post('', async (request, response) => {
  const {
    name,
    email,
    password,
    cnpj,
    whatsapp,
    phone,
    city,
    uf,
  } = request.body;

  const createOng = new CreateOngService();

  await createOng.execute({
    name,
    email,
    password,
    cnpj,
    city,
    uf,
    contact: {
      whatsapp,
      phone,
    },
  });

  return response.status(200).json({ message: 'Email enviado com sucesso' });
});

ongsRoutes.put('', ensureAuthenticated, upload, async (request, response) => {
  const { ongId } = request.ong;
  const { name, email, whatsapp, phone, city, uf } = request.body;

  const updateOng = new UpdadateOngService();

  const { ong, token } = await updateOng.execute({
    name,
    email,
    whatsapp,
    phone,
    city,
    uf,
    ongId,
  });

  return response.status(200).json({
    message: 'Ong atualizada com sucesso',
    ong: ongsView.render(ong),
    token,
  });
});

ongsRoutes.patch('/activeOng/:ongId', async (request, response) => {
  const { ongId } = request.params;

  const activeOngRegistration = new ActiveOngRegistrationService();

  await activeOngRegistration.execute(ongId);

  return response.status(200).send();
});

ongsRoutes.patch('/rejectOng/:ongId', async (request, response) => {
  const { ongId } = request.params;

  const rejectOngRegistration = new RejectOngRegistrationService();

  await rejectOngRegistration.execute(ongId);

  return response.status(200).send();
});

ongsRoutes.patch(
  '/updateOngProfile',
  ensureAuthenticated,
  upload,
  async (request, response) => {
    const { ongId } = request.ong;
    const { key, location: profile } = request.file as Profile;

    const updateImageProfile = new UpdateImageProfileService();

    const ongProfile = await updateImageProfile.execute({
      ongId,
      key,
      profile,
    });

    return response.status(200).json(ongProfile);
  },
);

ongsRoutes.patch(
  '/deleteOngProfile',
  ensureAuthenticated,
  async (request, response) => {
    const { ongId } = request.ong;

    const deleteImageProfile = new DeleteImageProfileService();

    await deleteImageProfile.execute(ongId);

    return response.status(204).send();
  },
);

ongsRoutes.delete('', ensureAuthenticated, async (request, response) => {
  const { ongId } = request.ong;

  const deleteOng = new DeleteOngService();

  await deleteOng.execute(ongId);

  return response.status(204).json({ message: 'Ong deletada com sucesso' });
});

export default ongsRoutes;
