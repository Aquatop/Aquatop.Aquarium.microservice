import { Router } from 'express';

import AquariumController from './app/controllers/AquariumController';
import PinController from './app/controllers/PinController';
import ActionsController from './app/controllers/ActionsController';
import validateAquariumStore from './app/validators/AquariumStore';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.get('/', (req, res) => res.json({ ok: true }));

routes.use(authMiddleware);

routes.put('/aquarium/:name', validateAquariumStore, AquariumController.update);
routes.get('/aquarium/:name', AquariumController.index);
routes.get('/aquarium', AquariumController.list);

routes.get('/pin/:name', PinController.index);
routes.post('/pin/:name', PinController.store);

routes.post('/actions/:name', ActionsController.store);

export default routes;
