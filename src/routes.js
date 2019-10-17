import { Router } from 'express';

import AquariumController from './app/controllers/AquariumController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.get('/', (req, res) => res.json({ ok: true }));

routes.use(authMiddleware);

// Adicionar validator
routes.put('/aquarium/:name', AquariumController.update);

export default routes;
