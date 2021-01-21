import { Router } from 'express';

import incidentsRoutes from './incidents.routes';
import ongsRoutes from './ongs.routes';
import authenticateRoutes from './authenticate.routes';

const routes = Router();

routes.use('/incidents', incidentsRoutes);
routes.use('/ongs', ongsRoutes);
routes.use('/authentications', authenticateRoutes);

export default routes;
