import { Router } from 'express';
import { getRepository } from 'typeorm';
import multer from 'multer';

import multerConfig from '../config/multer';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import Incident from '../models/Incident';
import incidentsView from '../views/incidentsView';
import CreateIncidentService from '../services/IncidentServices/CreateIncidentService';
import DeleteIncidentservice from '../services/IncidentServices/DeleteIncidentService';
import UpdateIncidentService from '../services/IncidentServices/UpdateIncidentService';

interface Profile extends Express.Multer.File {
  location: string;
  key: string;
}

const upload = multer(multerConfig).array('images');
const incidentsRoutes = Router();

incidentsRoutes.get('/limit/:page', async (request, response) => {
  const { page } = request.params;

  const offset = Number(page);

  const incidentsRepository = getRepository(Incident);

  const incidentsData = await incidentsRepository.find({
    relations: ['images', 'ong'],
    order: { created_at: 'ASC' },
    take: 3,
    skip: offset,
  });

  return response.status(200).json(incidentsData);
});

incidentsRoutes.get('/ong', ensureAuthenticated, async (request, response) => {
  const { ongId } = request.ong;

  const incidentsRepository = getRepository(Incident);

  const incidents = await incidentsRepository.find({
    where: { ong_id: ongId },
    relations: ['images'],
  });

  return response.status(200).json(incidentsView.renderMany(incidents));
});

incidentsRoutes.get(
  '/:incidentId',
  ensureAuthenticated,
  async (request, response) => {
    const { incidentId } = request.params;

    const incidentsRepository = getRepository(Incident);

    const incident = await incidentsRepository.findOne({
      where: { id: incidentId },
      relations: ['images'],
    });

    return response
      .status(200)
      .json(incidentsView.render(incident as Incident));
  },
);

incidentsRoutes.post(
  '',
  ensureAuthenticated,
  upload,
  async (request, response) => {
    const { ongId } = request.ong;
    const { title, description, value } = request.body;
    const requestImages = request.files as Profile[];

    const images = requestImages.map(image => ({
      key: image.key,
      url: image.location,
    }));

    const createIncident = new CreateIncidentService();

    await createIncident.execute({ title, description, value, ongId, images });

    return response
      .status(201)
      .json({ message: 'Caso/incidente criado com sucesso' });
  },
);

incidentsRoutes.patch('/views/:incidentId', async (request, response) => {
  const { incidentId } = request.params;

  const incidentsRepository = getRepository(Incident);

  const { views } = await incidentsRepository.findOneOrFail({
    where: { id: incidentId },
  });

  const newValue = views + 1;

  await incidentsRepository.update(incidentId, { views: newValue });

  return response.status(200).send();
});

incidentsRoutes.put(
  '',
  ensureAuthenticated,
  upload,
  async (request, response) => {
    const {
      id: incidentId,
      title,
      description,
      value,
      previews,
    } = request.body;
    const requestImages = request.files as Profile[];

    const images = requestImages.map(image => ({
      key: image.key,
      url: image.location,
    }));

    const updateIncident = new UpdateIncidentService();

    await updateIncident.execute({
      incidentId,
      title,
      description,
      value,
      previews,
      images,
    });

    return response
      .status(200)
      .json({ message: 'Caso/incidente atualizado com sucesso' });
  },
);

incidentsRoutes.delete(
  '/:incidentId',
  ensureAuthenticated,
  async (request, response) => {
    const { ongId } = request.ong;
    const { incidentId } = request.params;

    const deleteIncident = new DeleteIncidentservice();

    await deleteIncident.execute({ ongId, incidentId });

    request.app.get('socketServer').emiter('caseDeleted', incidentId);

    return response
      .status(204)
      .json({ message: 'Caso/incidente deletado com sucesso' });
  },
);

export default incidentsRoutes;
