import { Router, Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';

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

export default usersRouter;
