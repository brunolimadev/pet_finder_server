import { Router } from 'express';

import petsRouter from './pets.routes';
import usersRouter from './users.routes';

const routes = Router();

routes.get('/pets', petsRouter);
routes.get('/users', usersRouter);

export default routes;
