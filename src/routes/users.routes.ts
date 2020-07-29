import { Router, Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import UpdateUserService from '../services/UpdateUserService';

import provideAuthentication from '../middlewares/provideAuthentication';

const usersRouter = Router();

usersRouter.post('/', async (request: Request, response: Response) => {
  try {
    const {
      name,
      email,
      postal_code,
      address,
      number,
      city,
      state,
      password,
    } = request.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({
      name,
      email,
      postal_code,
      address,
      number,
      city,
      state,
      password,
    });

    delete user.password;

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

usersRouter.use(provideAuthentication);

usersRouter.put('/', async (request: Request, response: Response) => {
  try {
    const {
      id,
      name,
      email,
      postal_code,
      address,
      number,
      city,
      state,
      password,
    } = request.body;
    const updateUserService = new UpdateUserService();

    const user = await updateUserService.execute({
      id,
      name,
      email,
      postal_code,
      address,
      number,
      city,
      state,
      password,
    });

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ message: err.message });
  }
});

export default usersRouter;
