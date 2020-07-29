import { Router, Request, Response } from 'express';
import AuthenticateService from '../services/AuthenticateService';
import auth from '../config/auth';

const sessionRouter = Router();

sessionRouter.post('/', async (request: Request, response: Response) => {
  try {
    const { email, password } = request.body;

    const authService = new AuthenticateService();

    const { user } = await authService.execute({
      email,
      password,
    });

    delete user.password;

    return response.json(user);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default sessionRouter;
