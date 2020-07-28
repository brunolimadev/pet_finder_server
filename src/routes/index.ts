import { Router } from 'express';

import petsRouter from './pets.routes';

const routes = Router();

routes.get('/', petsRouter);

export default routes;
