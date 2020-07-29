import { Router } from 'express';

import petsRouter from './pets.routes';
import usersRouter from './users.routes';

const routes = Router();

routes.use('/pets', petsRouter);
routes.use('/users', usersRouter);

export default routes;
